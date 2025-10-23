import Image from 'next/image'
import Link from 'next/link'

import { Wallet } from '@coinbase/onchainkit/wallet'

export default function Header() {
  return (
    <header className="bg-background/50 sticky top-0 left-0 z-50 flex items-center justify-between gap-10 border-b border-gray-200 p-4 backdrop-blur-sm">
      <Link href="/">
        <Image src="/assets/svgs/logo.svg" alt="CapsuleX" width={118} height={28} />
      </Link>
      <Wallet />
    </header>
  )
}
