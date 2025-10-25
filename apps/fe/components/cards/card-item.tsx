import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Card as CardType } from '@/types'

interface CardItemProps {
  card: CardType
  className?: string
}

export default function CardItem({ card, className }: CardItemProps) {
  return (
    <Link href={`/cards/${card.id}`}>
      <Card
        className={cn(
          'relative cursor-pointer overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg',
          className,
        )}
      >
        {/* Featured Label */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary" className="bg-white/90 px-2 py-1 text-xs font-semibold text-black shadow-sm">
            FEATURED
          </Badge>
        </div>

        {/* Card Pack Image with Diagonal Stripes Background */}
        <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-900 via-blue-800 to-blue-900">
          {/* Diagonal Stripes Pattern */}
          <div className="absolute inset-0 opacity-80">
            <div className="absolute inset-0 scale-150 rotate-12 transform bg-linear-to-br from-transparent via-yellow-400/20 to-transparent"></div>
            <div className="absolute inset-0 scale-150 -rotate-12 transform bg-linear-to-br from-yellow-400/30 via-transparent to-yellow-400/30"></div>
          </div>

          {/* Card Pack Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-32 w-24 rotate-3 transform rounded-lg bg-linear-to-b from-blue-800 to-blue-900 shadow-2xl">
              {/* Card Pack Crimped Edges */}
              <div className="absolute top-0 right-0 left-0 h-2 rounded-t-lg bg-linear-to-r from-yellow-400 to-yellow-300"></div>
              <div className="absolute right-0 bottom-0 left-0 h-2 rounded-b-lg bg-linear-to-r from-yellow-400 to-yellow-300"></div>

              {/* Lightning Bolt Pattern */}
              <div className="absolute inset-2 rounded-md bg-linear-to-br from-yellow-400/40 to-transparent">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  {/* Pokéball Icon */}
                  <div className="relative h-12 w-12 rounded-full border-4 border-black bg-white">
                    <div className="absolute top-0 right-0 left-0 h-1/2 rounded-t-full bg-red-500"></div>
                    <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-black bg-white"></div>
                    <div className="absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Information */}
        <CardContent className="space-y-2 p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
              <p className="text-sm text-gray-600">${card.grade ? (card.grade * 5).toFixed(2) : '25.00'} value</p>
            </div>

            <Badge variant="outline" className="bg-gray-100 px-3 py-1 text-xs font-medium text-black shadow-sm">
              Grail Chance
            </Badge>
          </div>

          {/* Additional Card Details */}
          {card.category && <p className="text-xs text-gray-500 capitalize">{card.category}</p>}

          {card.grader && card.grader !== 'none' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Graded by:</span>
              <Badge variant="outline" className="text-xs">
                {card.grader.toUpperCase()}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
