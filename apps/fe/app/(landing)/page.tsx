import React from 'react'
import Hero from './_components/hero'
import CardsList from '@/components/cards/cards-list'

export default function Page() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Featured Cards</h2>
        <CardsList />
      </div>
    </div>
  )
}
