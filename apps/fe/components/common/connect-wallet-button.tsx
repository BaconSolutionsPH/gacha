import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import { Address, Avatar, Name, Identity, EthBalance } from '@coinbase/onchainkit/identity'

export default function ConnectWalletButton() {
  return (
    <Wallet>
      <ConnectWallet disconnectedLabel="Connect Wallet">
        <Avatar className="h-6 w-6" />
        <Name className="text-white" />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2 hover:bg-blue-200" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownLink className="hover:bg-blue-200" icon="wallet" href="https://keys.coinbase.com">
          Wallet
        </WalletDropdownLink>
        <WalletDropdownDisconnect className="hover:bg-blue-200" />
      </WalletDropdown>
    </Wallet>
  )
}
