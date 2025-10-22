# GachaVault Animations Documentation

This document outlines all the Framer Motion animations added to the GachaVault UI for enhanced user experience.

## Animation Overview

### 🎯 **Key Animation Features**

1. **Page Load Animations**: Staggered entry animations for all major sections
2. **Interactive Hover Effects**: Scale and transform effects on interactive elements
3. **Tab Transitions**: Smooth slide transitions between different sections
4. **Floating Animations**: Continuous subtle movements for visual appeal
5. **Micro-interactions**: Button press, hover, and focus animations

## Detailed Animation Breakdown

### 🏠 **Header Section**
- **Logo Animation**: 
  - Initial: Scale from 0 with -180° rotation
  - Hover: Scale to 1.1x with 5° rotation
  - Continuous: Gentle rotation and scale pulse (3s cycle)

- **Title Animation**: 
  - Slides in from left with opacity fade (0.6s duration, 0.3s delay)

- **Subtitle Animation**: 
  - Fades in with 0.5s delay

```tsx
<motion.header 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

### 🧭 **Navigation Tabs**
- **Staggered Entry**: Each tab animates in with 0.1s intervals
- **Active Tab Indicator**: Smooth `layoutId` transition with purple gradient overlay
- **Hover Effects**: -2px vertical lift
- **Icon Animations**: Active tab icons have rotation and scale pulse
- **Press Effect**: 0.95x scale on tap

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.95 }}
>
```

### 🎮 **Tab Content Transitions**
- **AnimatePresence**: Smooth transitions between tab content
- **Entry Animation**: Slides in from right (x: 20 → 0)
- **Exit Animation**: Slides out to left (x: 0 → -20)
- **Duration**: 0.3s for snappy feel

```tsx
<AnimatePresence mode="wait">
  <motion.div 
    key="collection"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
```

### 📊 **Statistics Cards**
- **Staggered Loading**: 0.1s delay between each card
- **Hover Effects**: 1.02x scale with shadow increase
- **Number Animations**: Spring-type scale animation for values
- **Icon Animations**: Continuous gentle rotation and scale pulse
- **Different Delays**: Each stat type has unique timing

```tsx
<motion.div
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }}
  whileHover={{ 
    scale: 1.02,
    transition: { duration: 0.2 }
  }}
>
```

### 🃏 **Character Cards**
- **Grid Animation**: Staggered entry with 0.05s intervals
- **Hover Effects**: 
  - 1.05x scale
  - -5px vertical lift
  - Shadow enhancement
- **Press Effect**: 0.95x scale
- **Initial State**: 0.8x scale with opacity 0
- **Star Animations**: Subtle glow and pulse effects

```tsx
<motion.div
  variants={{
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }}
  whileHover={{ 
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2 }
  }}
>
```

### 🎲 **Gacha Pull Section**
- **Floating Gem**: Continuous Y-axis movement (-10px to 0px, 3s cycle)
- **Rotating Gem**: Gentle rotation animation
- **Button Animations**:
  - Staggered entry (0.1s intervals)
  - Hover: 1.05x scale
  - Press: 0.95x scale
  - Gem Icon: Continuous 360° rotation (2s cycle)
- **Background**: Scale and opacity entrance

```tsx
<motion.div
  animate={{ 
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0]
  }}
  transition={{ 
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

### 🏆 **Leaderboards Section**
- **Stats Cards**: Staggered grid animation
- **Number Counters**: Spring-type scale entrance
- **Hover Effects**: 1.05x scale on stats cards
- **Entry Delays**: Progressive timing for visual hierarchy

### 👤 **Profile Section**
- **Avatar Animation**:
  - Initial: Scale 0 with -180° rotation
  - Entrance: Spring animation to scale 1
  - Hover: 1.1x scale with 5° rotation
- **Info Animation**: Fade up with 0.4s delay
- **Card Entrance**: 0.8x scale to 1x with opacity

```tsx
<motion.div 
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ 
    type: "spring", 
    duration: 0.8,
    delay: 0.2
  }}
  whileHover={{ 
    scale: 1.1,
    rotate: 5
  }}
>
```

## Animation Timing Strategy

### ⏱️ **Timing Hierarchy**
1. **Header**: 0-0.6s (immediate focus)
2. **Navigation**: 0.7-1.1s (secondary focus)
3. **Content**: 0.2-0.8s (context-dependent)
4. **Details**: 0.3-1.0s (supporting elements)

### 🎨 **Easing & Duration Guidelines**
- **Fast Interactions**: 0.2s (hover, press)
- **Content Transitions**: 0.3s (tab switching)
- **Page Load**: 0.6-0.8s (initial entrance)
- **Continuous**: 2-3s cycles (ambient animations)

## Performance Considerations

### ⚡ **Optimization Features**
- **CSS Transforms**: All animations use `transform` and `opacity` for GPU acceleration
- **AnimatePresence**: Efficient component mounting/unmounting
- **Stagger Control**: Prevents overwhelming simultaneous animations
- **Reduced Motion**: Respects user accessibility preferences (can be added)

### 🛠️ **Best Practices Implemented**
- Minimal DOM manipulation
- Hardware acceleration utilization
- Appropriate animation curves
- Semantic timing relationships
- Consistent interaction feedback

## Usage Examples

### Adding New Animated Components
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  {/* Your content */}
</motion.div>
```

### Creating Staggered Lists
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

This animation system creates a cohesive, engaging user experience that feels modern and responsive while maintaining good performance across devices.