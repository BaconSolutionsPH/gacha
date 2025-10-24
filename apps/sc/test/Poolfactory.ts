import { it, assert, describe } from "node:test";
import { equal } from 'node:assert'
import hre from "hardhat";
import PoolFactoryModule from "../ignition/modules/PoolFactory.js";
import { encodeFunctionData, isAddress, parseEventLogs } from "viem";
describe("PoolFactory Module", async () => {
    const { viem, ignition } = await hre.network.connect({ network: "sepolia" });
    const [wallet] = await viem.getWalletClients();
    const { poolFactory } = await ignition.deploy(PoolFactoryModule);
    const publicClient = await viem.getPublicClient();
    it("Create Factory", () => {
        equal(isAddress(poolFactory.address), true);
    })
    it("Create Pool", async () => {
        const encodedAbi = encodeFunctionData({
            abi: poolFactory.abi,
            functionName: "createPool",
            args: [{
                token: "0xAF33ADd7918F685B2A82C1077bd8c07d220FFA04",
                seller: "0x379f8d913A7C39B5d1A538C6B3008edb814edc6C",
                cardId: "test_card_002",
                threshold: 100000n,
                baseSpinPrice: 10n
            }]
        })
        const txHash = await wallet.sendTransaction({
            data: encodedAbi,
            to: poolFactory.address
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });
        const logs = parseEventLogs({ abi: poolFactory.abi, logs: receipt.logs }).find(e => e.eventName === "PoolCreated")
        equal(isAddress(logs?.args.poolAddress ?? ""), true);
        equal(isAddress(logs?.args?.escrowAddress ?? ""), true);
    })
    
})