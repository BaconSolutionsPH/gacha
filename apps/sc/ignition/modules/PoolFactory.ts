import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PoolFactory", (m) => {
    const poolFactory = m.contract("PoolFactory");
    return { poolFactory };
}); 
