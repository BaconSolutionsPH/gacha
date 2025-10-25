import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CapsulexToken", (m) => {
    const capsulex = m.contract("Capsulex");
    return { capsulex };
});
