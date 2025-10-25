import { Suspense } from 'react'
import { cardsApi } from '@/lib/api'
import CardItem from './card-item'
import CardsLoading from './cards-loading'
import CardsError from './cards-error'
import type { CardListQuery, Card } from '@/types'

interface CardsListProps {
  query?: CardListQuery
}

async function CardsContent({ query }: CardsListProps) {
  const data = await cardsApi.getCards(query)
  const cards = data.cards

  if (cards.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No cards found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => {
        // Convert CardResponse to Card type
        const cardData: Card = {
          ...card,
          grader: card.grader as 'psa' | 'bgs' | 'cgc' | 'none' | null,
        }
        return <CardItem key={card.id} card={cardData} />
      })}
    </div>
  )
}

export default function CardsList({ query }: CardsListProps) {
  return (
    <Suspense fallback={<CardsLoading />}>
      <CardsContent query={query} />
    </Suspense>
  )
}

// Export error boundary for use in pages
export { CardsError }
