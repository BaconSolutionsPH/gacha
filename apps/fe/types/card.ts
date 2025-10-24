// Card-related types for frontend

export interface ImageData {
  filename: string
  url: string
}

export type GraderType = 'psa' | 'bgs' | 'cgc' | 'none'

export interface Card {
  id: string
  sellerId: string
  name: string
  description: string | null
  serialNumber: string | null
  category: string
  images: ImageData[] | null
  grade: number | null
  grader: GraderType | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateCardData {
  name: string
  description?: string
  serialNumber?: string
  category: string
  grade?: number
  grader?: GraderType
  images?: File[]
}

export interface CardResponse {
  id: string
  sellerId: string
  name: string
  description: string | null
  serialNumber: string | null
  category: string
  images: ImageData[] | null
  grade: number | null
  grader: string | null
  createdAt: Date
  updatedAt: Date
}

export interface PaginationInfo {
  total: number
  hasNext: boolean
  hasPrevious: boolean
  offset: number
  limit: number
}

export interface CardsListResponse {
  cards: CardResponse[]
  pagination: PaginationInfo
}

export interface ApiErrorResponse {
  message: string
}

export interface CardListQuery {
  offset?: number
  limit?: number
  search?: string
}

// Form types for card creation
export interface CreateCardFormData {
  name: string
  description?: string
  serialNumber?: string
  category: string
  grade?: number
  grader?: GraderType
  images?: FileList
}

// Card display types for UI components
export interface CardDisplayProps {
  card: Card
  showSeller?: boolean
  showActions?: boolean
  variant?: 'grid' | 'list' | 'compact'
}

export interface CardsListProps {
  cards: Card[]
  loading?: boolean
  error?: string
  onCardClick?: (card: Card) => void
  onCardEdit?: (card: Card) => void
  onCardDelete?: (card: Card) => void
}
