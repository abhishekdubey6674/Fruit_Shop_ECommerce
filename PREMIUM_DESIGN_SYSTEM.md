# 💎 Premium Design System Documentation

## Overview
This document outlines the complete design system implemented for the Fruit Shop E-Commerce app, inspired by modern, clean interfaces like Stripe, Notion, Linear, and Vercel.

---

## 🎨 Color System

### Primary Colors
```typescript
primary: '#00D9A3'        // Fresh, vibrant green
primaryLight: '#33E3B5'   // Lighter variant
primaryDark: '#00B386'    // Darker variant
primaryGlow: 'rgba(0, 217, 163, 0.12)'  // Subtle glow effect
primarySoft: 'rgba(0, 217, 163, 0.08)'  // Soft background
```

### Secondary Colors
```typescript
secondary: '#FF6B35'      // Vibrant orange accent
secondaryLight: '#FF8A5B' // Lighter variant
secondaryDark: '#E85A2A'  // Darker variant
```

### Neutral Palette
```typescript
background: '#FAFBFC'           // Main background
backgroundDark: '#F5F7FA'       // Darker background
backgroundElevated: '#FFFFFF'   // Elevated surfaces
```

### Text Hierarchy
```typescript
textPrimary: '#1A1F36'     // Primary text (high contrast)
textSecondary: '#697386'   // Secondary text
textTertiary: '#9BA3B4'    // Tertiary text
textLight: '#C1C7D0'       // Light text
textMuted: '#E3E8EF'       // Muted text
```

### Status Colors
```typescript
success: '#00D9A3'         // Success state
error: '#F04438'           // Error state
warning: '#F79009'         // Warning state
info: '#3B82F6'            // Info state
```

---

## 📏 Spacing System (8px Grid)

```typescript
xs: 4px      // Extra small
sm: 8px      // Small
md: 16px     // Medium
lg: 24px     // Large
xl: 32px     // Extra large
xxl: 48px    // 2X large
xxxl: 64px   // 3X large
```

**Usage:**
- Use consistent spacing throughout the app
- Maintain 8px grid alignment
- Stack spacing: md (16px) between elements
- Section spacing: lg-xl (24-32px)
- Screen padding: lg (24px)

---

## 🔲 Border Radius System

```typescript
xs: 4px      // Subtle rounding
sm: 8px      // Small elements
md: 12px     // Standard elements
lg: 16px     // Cards, buttons
xl: 20px     // Large cards
xxl: 24px    // Extra large cards
full: 9999px // Circular elements
```

**Usage:**
- Buttons: lg-xl (16-20px)
- Cards: xl-xxl (20-24px)
- Input fields: lg (16px)
- Avatars: full (circular)
- Badges: full (pill shape)

---

## 📝 Typography System

### Font Sizes
```typescript
xs: 12px     // Small labels, captions
sm: 14px     // Secondary text
base: 16px   // Body text
lg: 18px     // Emphasized text
xl: 20px     // Subheadings
xxl: 24px    // Section titles
xxxl: 32px   // Page titles
display: 48px // Hero text
```

### Font Weights
```typescript
regular: '400'    // Body text
medium: '500'     // Emphasized text
semibold: '600'   // Subheadings
bold: '700'       // Headings
extrabold: '800'  // Display text
```

### Line Heights
```typescript
tight: 1.2      // Headings
normal: 1.5     // Body text
relaxed: 1.75   // Long-form content
```

**Typography Guidelines:**
- Use negative letter spacing (-0.5 to -1) for large headings
- Use positive letter spacing (0.3-0.8) for small text and labels
- Maintain clear hierarchy with size and weight
- Limit to 2-3 font weights per screen

---

## 🎭 Shadow System

### Small Shadow (Subtle Elevation)
```typescript
shadowColor: rgba(16, 24, 40, 0.05)
shadowOffset: { width: 0, height: 1 }
shadowRadius: 2px
elevation: 2
```
**Use for:** Input fields, small cards, badges

### Medium Shadow (Standard Elevation)
```typescript
shadowColor: rgba(16, 24, 40, 0.08)
shadowOffset: { width: 0, height: 2 }
shadowRadius: 8px
elevation: 4
```
**Use for:** Cards, buttons, navigation bars

### Large Shadow (High Elevation)
```typescript
shadowColor: rgba(16, 24, 40, 0.12)
shadowOffset: { width: 0, height: 4 }
shadowRadius: 16px
elevation: 8
```
**Use for:** Modals, dropdowns, floating elements

### Extra Large Shadow (Maximum Elevation)
```typescript
shadowColor: rgba(16, 24, 40, 0.12)
shadowOffset: { width: 0, height: 8 }
shadowRadius: 24px
elevation: 12
```
**Use for:** Bottom navigation, important CTAs

---

## 🎬 Animation Guidelines

### Timing Functions
- **Spring animations:** Use for interactive elements (buttons, cards)
- **Timing animations:** Use for transitions (fade, slide)

### Duration Standards
```typescript
fast: 200ms      // Quick feedback
normal: 300ms    // Standard transitions
slow: 500ms      // Emphasized transitions
```

### Animation Patterns

**Button Press:**
```typescript
Animated.spring(scaleAnim, {
  toValue: 0.96,
  useNativeDriver: true,
}).start();
```

**Fade In:**
```typescript
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start();
```

**Bounce Effect:**
```typescript
Animated.loop(
  Animated.sequence([
    Animated.timing(bounceAnim, {
      toValue: -8,
      duration: 600,
      useNativeDriver: true,
    }),
    Animated.timing(bounceAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }),
  ])
).start();
```

---

## 🧩 Component Patterns

### Cards
```typescript
- Background: backgroundElevated (#FFFFFF)
- Border: 1px solid cardBorder
- Border Radius: xl-xxl (20-24px)
- Shadow: md
- Padding: lg-xl (24-32px)
```

### Buttons
```typescript
Primary:
- Background: Gradient (primary → primaryDark)
- Text: white
- Border Radius: lg-xl (16-20px)
- Padding: lg horizontal, md vertical
- Shadow: md with primary color

Secondary:
- Background: primarySoft
- Text: primary
- Border: 1.5px solid primary
- Border Radius: lg
```

### Input Fields
```typescript
- Background: backgroundElevated
- Border: 1.5px solid borderLight
- Border Radius: lg (16px)
- Padding: lg horizontal, md+2 vertical
- Focus: Border color → primary, shadow → md
```

### Badges
```typescript
- Background: primarySoft or glass
- Border Radius: full (pill shape)
- Padding: md horizontal, sm vertical
- Font: xs, semibold
- Shadow: sm
```

---

## 📱 Screen Layouts

### Standard Screen Structure
```
┌─────────────────────────┐
│ Header (with shadow)    │ ← 56-70px height
├─────────────────────────┤
│                         │
│ Content Area            │ ← Padding: lg (24px)
│ (Scrollable)            │
│                         │
│                         │
├─────────────────────────┤
│ Bottom Navigation       │ ← 75px height, rounded top
└─────────────────────────┘
```

### Content Spacing
- Screen padding: lg (24px)
- Section spacing: xl (32px)
- Element spacing: md (16px)
- Bottom padding: 100px (for tab bar)

---

## 🎯 Interaction States

### Touch States
```typescript
Default → Pressed → Released

Pressed:
- Scale: 0.96
- Opacity: 0.9 (optional)

Released:
- Spring back to scale: 1
- Friction: 3, Tension: 40
```

### Focus States
```typescript
Input Focus:
- Border color: primary
- Border width: 1.5px → 2px
- Shadow: sm → md
- Background: backgroundDark → white
```

### Hover States (for web)
```typescript
- Background: hover color
- Scale: 1.02
- Shadow: sm → md
```

---

## ✅ Accessibility Guidelines

### Touch Targets
- Minimum size: 44x44px
- Recommended: 48x48px
- Spacing between targets: 8px minimum

### Color Contrast
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Text Sizes
- Minimum body text: 16px
- Minimum label text: 14px
- Maximum line length: 70 characters

---

## 🚀 Performance Best Practices

### Animations
- Always use `useNativeDriver: true` when possible
- Avoid animating layout properties
- Use `transform` and `opacity` for best performance

### Shadows
- Use elevation on Android
- Use shadow properties on iOS
- Limit shadow complexity

### Images
- Use appropriate image sizes
- Implement lazy loading
- Use caching strategies

---

## 📦 Component Library

### Available Components
1. **Card** - Reusable card container
2. **PrimaryButton** - Gradient button with animations
3. **SearchBar** - Animated search input
4. **NotificationBadge** - Animated count badge
5. **LoadingShimmer** - Skeleton loading state
6. **Icon** - Emoji-based icon system

### Usage Example
```typescript
import { Card } from '../components/Card';
import { COLORS, SPACING, RADIUS } from '../constants/colors';

<Card elevated padding={SPACING.lg}>
  <Text>Content</Text>
</Card>
```

---

## 🎨 Design Principles

### 1. Clarity
- Clear visual hierarchy
- Obvious interactive elements
- Consistent patterns

### 2. Efficiency
- Minimal cognitive load
- Quick access to features
- Smooth transitions

### 3. Delight
- Subtle animations
- Polished interactions
- Attention to detail

### 4. Consistency
- Unified design language
- Predictable behavior
- Systematic approach

---

## 📊 Before & After Comparison

### Color Palette
- **Before:** Basic green (#2ECC71)
- **After:** Premium teal (#00D9A3) with full system

### Typography
- **Before:** Inconsistent sizes and weights
- **After:** Systematic scale with clear hierarchy

### Spacing
- **Before:** Random padding values
- **After:** 8px grid system

### Shadows
- **Before:** Basic elevation
- **After:** Layered shadow system

### Animations
- **Before:** Simple transitions
- **After:** Spring animations with micro-interactions

---

## 🔄 Migration Guide

### Updating Existing Components
1. Import new design tokens
2. Replace hardcoded values with system values
3. Add proper shadows using SHADOWS presets
4. Implement animations for interactions
5. Test on both iOS and Android

### Example Migration
```typescript
// Before
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2ECC71',
    padding: 15,
    borderRadius: 10,
  },
});

// After
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.md,
  },
});
```

---

## 📝 Checklist for New Screens

- [ ] Use design system colors
- [ ] Apply spacing system (8px grid)
- [ ] Use typography scale
- [ ] Add appropriate shadows
- [ ] Implement animations
- [ ] Test touch targets (44px minimum)
- [ ] Check color contrast
- [ ] Test on both platforms
- [ ] Verify responsive behavior
- [ ] Add loading states

---

## 🎉 Result

The app now features a **premium, modern design system** that:
- ✅ Provides consistent visual language
- ✅ Ensures scalability and maintainability
- ✅ Delivers delightful user experience
- ✅ Matches industry-leading design standards
- ✅ Supports rapid development with reusable components

---

**Design System Version:** 2.0  
**Last Updated:** November 2025  
**Maintained by:** Development Team
