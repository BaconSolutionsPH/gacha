import hre from "hardhat";
import PoolFactoryModule from "../ignition/modules/PoolFactory.js";
import CapsulexTokenModule from "../ignition/modules/capsulex.js";
import { encodeFunctionData, parseEventLogs } from "viem";

async function main() {
    const { ignition, viem } = await hre.network.connect({ network: "sepolia" });
    const [wallet] = await viem.getWalletClients();
    const { capsulex } = await ignition.deploy(CapsulexTokenModule);
    const { poolFactory } = await ignition.deploy(PoolFactoryModule);
}
main().catch(console.error);
