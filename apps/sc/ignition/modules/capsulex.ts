import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Capsulex Token", (m) => {
    const capsulex = m.contract("Capsulex");
    return { capsulex };
});
