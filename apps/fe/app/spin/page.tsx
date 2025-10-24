import React from 'react'
import SpinnerContent from './_components/spinner-content'

export default function SpinPage() {
  return (
    <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col items-center justify-center p-4 lg:p-20">
      <SpinnerContent />
    </div>
  )
}
