import "dotenv/config"
import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
const config: HardhatUserConfig = {
  plugins: [
    hardhatVerify,
    hardhatToolboxViemPlugin,
  ],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY!,
      enabled: true
    },
  },
  networks: {
    sepolia: {
      type: "http",
      chainType: "op",
      url: process.env.SEPOLIA_RPC_URL!,
      accounts: [process.env.DEPLOYER_PRIV_KEY!],
    },
  },
};

export default config;
