# GachaVault UI

A comprehensive user interface for a gacha character collection management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎮 Collection Management
- **Character Collection**: View and manage your character collection with detailed statistics
- **Collection Rate Tracking**: Monitor your collection progress with percentage completion
- **Character Cards**: Interactive character cards showing rarity, level, element, and ownership status
- **Search & Filter**: Find characters quickly with search functionality

### 🎲 Gacha Simulation
- **Pull Simulator**: Simulate single pulls and 10-pulls with realistic drop rates
- **Currency System**: Gem and coin management system
- **Rarity System**: 1-5 star rarity system with appropriate drop rates
- **Pull Animation**: Engaging pull animations with results display

### 🏆 Leaderboards
- **Global Rankings**: View your position among all players
- **Statistics Dashboard**: Track personal performance metrics
- **Progress Tracking**: Monitor your advancement through ranks
- **Achievement System**: Display recent accomplishments

### 👤 Player Profile
- **Personal Statistics**: View your player level, join date, and achievements
- **Activity Feed**: Recent actions and accomplishments
- **Performance Metrics**: Global rank and total pulls

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color scheme
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons
- **State Management**: React hooks (useState)

## UI Components Created

### Core Components
- `Navbar`: Navigation header with currency display and mobile-responsive menu
- `CharacterCard`: Interactive character display with rarity indicators and progression
- `GachaPullSimulator`: Complete gacha simulation with animations
- `LeaderboardsPage`: Rankings display with stats cards

### UI Library Components
- Button, Card, Badge, Input, Dialog, Tabs, Avatar, Progress
- All styled with consistent design system

## Design System

### Colors
- **Primary**: Purple to pink gradient theme
- **Secondary**: Blue accents for collection elements
- **Accent**: Yellow for rarity and achievements
- **Success**: Green for positive metrics

### Layout
- **Responsive Design**: Mobile-first approach with breakpoints
- **Grid System**: Flexible grid layouts for different screen sizes
- **Typography**: Clear hierarchy with appropriate font weights

## Key Features Implemented

1. **Tab Navigation**: Four main sections (Collection, Pulls, Leaderboards, Profile)
2. **Mock Data Integration**: Realistic sample data for demonstration
3. **Interactive Elements**: Buttons, hover effects, and state management
4. **Responsive Design**: Optimized for mobile and desktop viewing
5. **Accessibility**: Proper semantic HTML and ARIA labels

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## File Structure

```
apps/fe/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── navbar.tsx          # Navigation component
│   ├── character-card.tsx  # Character display card
│   ├── gacha-simulator.tsx # Pull simulation component
│   ├── leaderboards-page.tsx # Rankings component
│   └── ui/                 # shadcn/ui components
└── lib/
    └── utils.ts            # Utility functions
```

## Next Steps

To fully implement the GachaVault system, consider adding:

1. **Backend Integration**: Connect to your Elysia.js backend
2. **Database Integration**: Character data, user profiles, pull history
3. **Authentication**: User login and registration
4. **Real-time Updates**: WebSocket for live leaderboard updates
5. **Advanced Features**: 
   - Character details modal
   - Team building system
   - Battle simulation
   - Event banners
   - Achievement system
   - Social features

The UI provides a solid foundation for a complete gacha game management system and can be easily extended with additional features as needed.