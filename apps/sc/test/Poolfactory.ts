import { it, describe } from "node:test";
import { equal, notEqual } from 'node:assert'
import hre from "hardhat";
import PoolFactoryModule from "../ignition/modules/PoolFactory.js";
import CapsulexTokenModule from "../ignition/modules/capsulex.js";
import { encodeFunctionData, getContract, Hex, isAddress, parseEventLogs, parseUnits } from "viem";
import { parse } from "node:path";
describe("Deploy Token & PoolFactory Module", async () => {
    const { viem, ignition } = await hre.network.connect({ network: "sepolia" });
    const [wallet] = await viem.getWalletClients();
    const { capsulex } = await ignition.deploy(CapsulexTokenModule);
    const { poolFactory } = await ignition.deploy(PoolFactoryModule);
    const publicClient = await viem.getPublicClient();  
    let poolAddress: Hex | undefined, escrowAddress: Hex | undefined;
    it("Deploy Token", async () => {
        equal(isAddress(capsulex.address), true);
        console.log(`Token address: ${capsulex.address}`);
    })
    it("Create Factory", () => {
        equal(isAddress(poolFactory.address), true);
    })
    it("Approve Token to Factory", async () => {
        const encodedAbi = encodeFunctionData({
            abi: capsulex.abi,
            functionName: "approve",
            args: [poolFactory.address, parseUnits("2000", 18)]
        })
        const txHash = await wallet.sendTransaction({
            data: encodedAbi,
            to: capsulex.address
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });
        equal(receipt.status, "success");
    })
    it("Create Pool", async () => {
        const encodedAbi = encodeFunctionData({
            abi: poolFactory.abi,
            functionName: "createPool",
            args: [{
                token: capsulex.address,
                seller: wallet.account.address,
                cardId: "test_card_002",
                threshold: parseUnits("1000", 18),
                baseSpinPrice: parseUnits("10", 18)
            }]
        })
        const txHash = await wallet.sendTransaction({
            data: encodedAbi,
            to: poolFactory.address
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });
        equal(receipt.status, "success");
        const logs = parseEventLogs({ abi: poolFactory.abi, logs: receipt.logs }).find(e => e.eventName === "PoolCreated")
        equal(isAddress(logs?.args.poolAddress ?? ""), true);
        equal(isAddress(logs?.args?.escrowAddress ?? ""), true);
        console.log("New Pool Created at address:", logs?.args.poolAddress);
        console.log("Escrow Address:", logs?.args.escrowAddress);
    }) 
    it("Contribute to Pool", async () => {
        notEqual(poolAddress, undefined);
        notEqual(escrowAddress, undefined);
        const pool = await hre.artifacts.readArtifact("Pool")
        const encodedAbi = encodeFunctionData({
            abi: pool.abi,
            functionName: "contribute",
            args: [parseUnits("10", 18)]
        })
        const txHash = await wallet.sendTransaction({
            data: encodedAbi,
            to: poolFactory.address
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });
        equal(receipt.status, "success");
    })
})