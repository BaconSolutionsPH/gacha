import { it, describe } from "node:test";
import { equal } from 'node:assert'
import hre from "hardhat";
import PoolFactoryModule from "../ignition/modules/PoolFactory.js";
import CapsulexTokenModule from "../ignition/modules/capsulex.js";
import { encodeFunctionData, Hex, isAddress, parseEventLogs, parseUnits } from "viem";
describe("Deploy Token & PoolFactory Module", async () => {
    const { viem, ignition } = await hre.network.connect({ network: "sepolia" });
    const [wallet] = await viem.getWalletClients();
    const { capsulex } = await ignition.deploy(CapsulexTokenModule);
    const { poolFactory } = await ignition.deploy(PoolFactoryModule);
    const publicClient = await viem.getPublicClient();  
    let poolAddress: Hex | undefined, escrowAddress: Hex | undefined;
    it("Deploy Token", async () => {
        equal(isAddress(capsulex.address), true);
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
                owner: wallet.account.address,
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
        poolAddress = logs?.args.poolAddress;
        escrowAddress = logs?.args.escrowAddress;
    })
    it("Approve Token to Pool", async () => {
        const encodedAbi = encodeFunctionData({
            abi: capsulex.abi,
            functionName: "approve",
            args: [poolAddress!, parseUnits("10", 18)]
        })
        const txHash = await wallet.sendTransaction({
            data: encodedAbi,
            to: capsulex.address
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });
        equal(receipt.status, "success");
    })
    it("Contribute to Pool", async () => {
        const pool = await hre.artifacts.readArtifact("Pool")
        const encodedAbi = encodeFunctionData({
            abi: pool.abi,
            functionName: "contribute",
            args: [parseUnits("10", 18)]
        })
        const txHash = await wallet.sendTransaction({
            data: encodedAbi,
            to: poolAddress!
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });
        equal(receipt.status, "success");
    })
})