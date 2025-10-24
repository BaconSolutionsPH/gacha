import { Suspense } from 'react'
import CardsList from './cards-list'
import CardsLoading from './cards-loading'
import type { CardListQuery } from '@/types'

interface CardsWrapperProps {
  query?: CardListQuery
}

export default function CardsWrapper({ query }: CardsWrapperProps) {
  return (
    <Suspense fallback={<CardsLoading />}>
      <CardsList query={query} />
    </Suspense>
  )
}
