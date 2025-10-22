# GachaVault 🎮✨

A comprehensive gacha character collection management system with an animated UI and robust backend API.

## 🌟 Features

### Frontend (Next.js + Framer Motion)
- **🃏 Character Collection Management**: Interactive character cards with rarity indicators
- **🎲 Gacha Pull Simulator**: Realistic pull mechanics with animations
- **🏆 Global Leaderboards**: Rankings and performance tracking
- **👤 Player Profiles**: Personal statistics and activity feeds
- **🎨 Animated UI**: Smooth Framer Motion animations throughout
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend (Elysia.js + Drizzle ORM)
- **🔐 Authentication System**: JWT-based user authentication
- **📊 Database Models**: User management and character data
- **🚀 High Performance**: Bun runtime for optimal speed
- **🛡️ Type Safety**: Full TypeScript implementation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Database (PostgreSQL recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/BaconSolutionsPH/gacha.git
cd gacha
```

2. **Install dependencies**
```bash
bun install
```

3. **Environment Setup**
```bash
# Copy environment files
cp apps/backend/.env.example apps/backend/.env
cp apps/fe/.env.example apps/fe/.env.local
```

4. **Database Setup**
```bash
cd apps/backend
bun run db:generate
bun run db:migrate
```

### Development

**Start all applications:**
```bash
bun run dev
```

**Start individual applications:**
```bash
# Frontend only
bun run dev --filter=fe

# Backend only  
bun run dev --filter=backend
```

**Build for production:**
```bash
bun run build
```

## 📁 Project Structure

```
gacha/
├── apps/
│   ├── fe/                    # Next.js Frontend
│   │   ├── app/              # App Router pages
│   │   ├── components/       # React components
│   │   ├── lib/             # Utilities
│   │   └── public/          # Static assets
│   └── backend/             # Elysia.js Backend  
│       ├── src/
│       │   ├── controller/  # Route controllers
│       │   ├── models/      # Database models
│       │   ├── routes/      # API routes
│       │   └── lib/         # Utilities
│       └── drizzle.config.ts
├── packages/
│   ├── eslint-config/       # Shared ESLint configs
│   └── typescript-config/   # Shared TypeScript configs
├── package.json
└── turbo.json              # Turborepo configuration
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components  
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Icons**: Lucide React

### Backend
- **Runtime**: Bun
- **Framework**: Elysia.js
- **Database**: Drizzle ORM (PostgreSQL)
- **Authentication**: JWT
- **Language**: TypeScript

### DevOps & Tooling
- **Monorepo**: Turborepo
- **Linting**: ESLint + Biome
- **Package Manager**: Bun
- **Version Control**: Git

## 📚 Documentation

- [Frontend UI Documentation](apps/fe/README-UI.md)
- [Animation System Guide](apps/fe/ANIMATIONS.md)
- [Backend API Documentation](apps/backend/README.md)

## 🎯 Key Features Breakdown

### 🎮 Collection Management
- Character inventory with search and filtering
- Rarity system (1-5 stars) with visual indicators
- Level progression and duplicate tracking
- Collection completion statistics

### 🎲 Gacha System
- Single and 10-pull options
- Realistic drop rates and animations
- Currency management (gems, coins)
- Pull history and statistics

### 🏆 Competitive Features  
- Global leaderboards and rankings
- Personal performance metrics
- Achievement system
- Social comparison tools

### ✨ Animation System
- Page load sequences with staggered reveals
- Interactive hover and press feedback
- Smooth tab transitions with AnimatePresence
- Ambient floating and rotation effects
- Optimized for performance (GPU acceleration)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Turborepo](https://turborepo.org/) for monorepo management
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
