interface EthereumProvider {
  request(args: { method: string; params?: any[] }): Promise<any>
  isMetaMask?: boolean
}

interface Window {
  ethereum?: EthereumProvider
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}
