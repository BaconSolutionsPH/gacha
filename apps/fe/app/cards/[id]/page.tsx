import Image from 'next/image'
import Link from 'next/link'
import { cardsApi } from '@/lib/api'
import type { ImageData, Card } from '@/types'

function CardContent({ card }: { card: Card }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card Images */}
          <div className="space-y-4">
            {card.images && card.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {card.images.map((image: ImageData, index: number) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image.url}
                      alt={`${card.name} - Image ${index + 1}`}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-200">
                <Image
                  src="/assets/images/default-card.webp"
                  alt="Default card image"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Card Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{card.name}</h1>
              {card.category && <p className="mt-2 text-sm text-gray-600 capitalize">{card.category}</p>}
            </div>

            {card.description && (
              <div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900">Description</h2>
                <p className="text-gray-700">{card.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {card.serialNumber && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Serial Number</h3>
                  <p className="text-lg font-semibold text-gray-900">{card.serialNumber}</p>
                </div>
              )}

              {card.grade && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Grade</h3>
                  <p className="text-lg font-semibold text-gray-900">{card.grade}</p>
                </div>
              )}

              {card.grader && card.grader !== 'none' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Grader</h3>
                  <p className="text-lg font-semibold text-gray-900 uppercase">{card.grader}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500">Value</h3>
                <p className="text-lg font-semibold text-gray-900">
                  ${card.grade ? (card.grade * 5).toFixed(2) : '25.00'}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <button className="w-full rounded-md bg-blue-600 px-4 py-3 text-lg font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                Add to Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Card Not Found</h1>
          <p className="mb-6 text-gray-600">The card you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function CardPage({ params }: { params: Promise<{ id: string }> }) {
  let card: Card | null = null
  const { id } = await params

  try {
    card = await cardsApi.getCardById(id)
  } catch {
    return <CardNotFound />
  }

  if (!card) {
    return <CardNotFound />
  }

  return <CardContent card={card} />
}
