import hre from "hardhat";
import PoolFactoryModule from "../ignition/modules/PoolFactory.js";
import { encodeFunctionData, parseEventLogs } from "viem";

async function main() {
    const { ignition, viem } = await hre.network.connect({ network: "sepolia" });
    const [wallet] = await viem.getWalletClients();
    const { poolFactory } = await ignition.deploy(PoolFactoryModule);
    console.log(`Pool address: ${poolFactory.address}`);
    const publicClient = await viem.getPublicClient();
    const encodedAbi = encodeFunctionData({
        abi: poolFactory.abi,
        functionName: "createPool",
        args: [{
            token: "0xAF33ADd7918F685B2A82C1077bd8c07d220FFA04",
            seller: "0x379f8d913A7C39B5d1A538C6B3008edb814edc6C",
            cardId: "test_card_001",
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
    console.log("New Pool Created at address:", logs?.args.poolAddress);
    console.log("Escrow Address:", logs?.args.escrowAddress);
}
main().catch(console.error);
