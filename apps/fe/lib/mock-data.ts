import type { Card } from '@/types'

export const mockCards: Card[] = [
  {
    id: '1',
    sellerId: 'seller-1',
    name: 'Charizard',
    description: 'A powerful Fire-type Pokémon with impressive stats and abilities.',
    serialNumber: 'CHR-001',
    category: 'pokemon',
    images: [
      {
        filename: 'charizard-front.jpg',
        url: 'https://images.pokemontcg.io/base1/4_hires.png',
      },
      {
        filename: 'charizard-back.jpg',
        url: 'https://images.pokemontcg.io/base1/4_hires.png',
      },
    ],
    grade: 9.5,
    grader: 'psa',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    sellerId: 'seller-1',
    name: 'Blastoise',
    description: 'A massive Water-type Pokémon known for its powerful water cannons.',
    serialNumber: 'BLS-002',
    category: 'pokemon',
    images: [
      {
        filename: 'blastoise-front.jpg',
        url: 'https://images.pokemontcg.io/base1/2_hires.png',
      },
    ],
    grade: 8.0,
    grader: 'bgs',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    sellerId: 'seller-2',
    name: 'Venusaur',
    description: 'A Grass-type Pokémon with a large flower on its back.',
    serialNumber: 'VNS-003',
    category: 'pokemon',
    images: [
      {
        filename: 'venusaur-front.jpg',
        url: 'https://images.pokemontcg.io/base1/15_hires.png',
      },
    ],
    grade: 7.5,
    grader: 'cgc',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    sellerId: 'seller-2',
    name: 'Pikachu',
    description: 'The most popular Electric-type Pokémon, known for its cute appearance.',
    serialNumber: 'PIK-004',
    category: 'pokemon',
    images: [
      {
        filename: 'pikachu-front.jpg',
        url: 'https://images.pokemontcg.io/base1/58_hires.png',
      },
    ],
    grade: 10.0,
    grader: 'psa',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    sellerId: 'seller-3',
    name: 'Mewtwo',
    description: 'A powerful Psychic-type Pokémon created through genetic engineering.',
    serialNumber: 'MEW-005',
    category: 'pokemon',
    images: [
      {
        filename: 'mewtwo-front.jpg',
        url: 'https://images.pokemontcg.io/base1/10_hires.png',
      },
    ],
    grade: 9.0,
    grader: 'bgs',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: '6',
    sellerId: 'seller-3',
    name: 'Mew',
    description: 'A mythical Psychic-type Pokémon with the ability to learn any move.',
    serialNumber: 'MEW-006',
    category: 'pokemon',
    images: [
      {
        filename: 'mew-front.jpg',
        url: 'https://images.pokemontcg.io/base1/101_hires.png',
      },
    ],
    grade: 8.5,
    grader: 'psa',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '7',
    sellerId: 'seller-1',
    name: 'Dragonite',
    description: 'A Dragon/Flying-type Pokémon with incredible strength and speed.',
    serialNumber: 'DRG-007',
    category: 'pokemon',
    images: [
      {
        filename: 'dragonite-front.jpg',
        url: 'https://images.pokemontcg.io/base1/4_hires.png',
      },
    ],
    grade: 9.2,
    grader: 'cgc',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '8',
    sellerId: 'seller-2',
    name: 'Alakazam',
    description: 'A powerful Psychic-type Pokémon with extremely high intelligence.',
    serialNumber: 'ALK-008',
    category: 'pokemon',
    images: [
      {
        filename: 'alakazam-front.jpg',
        url: 'https://images.pokemontcg.io/base1/1_hires.png',
      },
    ],
    grade: 8.8,
    grader: 'bgs',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '9',
    sellerId: 'seller-1',
    name: 'Gyarados',
    description: 'A powerful Water/Flying-type Pokémon that evolves from Magikarp.',
    serialNumber: 'GYR-009',
    category: 'pokemon',
    images: [
      {
        filename: 'gyarados-front.jpg',
        url: 'https://images.pokemontcg.io/base1/6_hires.png',
      },
    ],
    grade: 9.8,
    grader: 'psa',
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23'),
  },
  {
    id: '10',
    sellerId: 'seller-3',
    name: 'Machamp',
    description: 'A Fighting-type Pokémon with four powerful arms.',
    serialNumber: 'MCH-010',
    category: 'pokemon',
    images: [
      {
        filename: 'machamp-front.jpg',
        url: 'https://images.pokemontcg.io/base1/8_hires.png',
      },
    ],
    grade: 8.2,
    grader: 'cgc',
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24'),
  },
]

export const mockCardsListResponse = {
  cards: mockCards,
  pagination: {
    total: mockCards.length,
    hasNext: false,
    hasPrevious: false,
    offset: 0,
    limit: 10,
  },
}
