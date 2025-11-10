# 🚀 Quick Reference Guide

## Common Commands

### Development
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Clear cache and restart
npm start -- --reset-cache
```

### Troubleshooting
```bash
# Reinstall dependencies
rm -rf node_modules && npm install

# Clean Android build
cd android && ./gradlew clean && cd ..

# Reinstall iOS pods
cd ios && pod deintegrate && pod install && cd ..
```

## File Locations

### Screens
- Landing: `src/screens/LandingScreen.tsx`
- Auth: `src/screens/AuthScreen.tsx`
- Dashboard: `src/screens/DashboardScreen.tsx`
- Cart: `src/screens/CartScreen.tsx`
- Profile: `src/screens/ProfileScreen.tsx`

### Components
- Carousel: `src/components/Carousel.tsx`
- FruitCard: `src/components/FruitCard.tsx`
- Header: `src/components/Header.tsx`

### Configuration
- Colors: `src/constants/colors.ts`
- Dummy Data: `src/constants/dummy-data.ts`
- API Setup: `src/services/api.ts`
- Navigation: `src/navigation/AppNavigator.tsx`

## Quick Customizations

### Change Primary Color
**File**: `src/constants/colors.ts`
```typescript
primary: '#YOUR_COLOR',
```

### Add New Fruit
**File**: `src/constants/dummy-data.ts`
```typescript
{
  id: '7',
  name: 'New Fruit',
  price: 9.99,
  unit: 'kg',
  image: 'URL',
  category: 'Category',
  rating: 4.5,
  inStock: true,
}
```

### Add New Category
**File**: `src/constants/dummy-data.ts`
```typescript
{ id: '7', name: 'NewCategory', icon: '🍇' }
```

### Change Carousel Banner
**File**: `src/constants/dummy-data.ts`
```typescript
{
  id: '4',
  title: 'New Offer',
  subtitle: 'Description',
  image: 'URL',
  discount: '25% OFF',
}
```

## Testing Credentials

### Login
- **Phone**: Any 10 digits (e.g., 1234567890)
- **OTP**: 1234

### Sign Up
- **Name**: Any name
- **Email**: Any email
- **Password**: Any password
- **Phone**: Any 10 digits

## Navigation Structure

```
Landing
  └─ Auth (Login/Signup)
      └─ Main (Bottom Tabs)
          ├─ Home (Dashboard)
          ├─ Cart
          └─ Profile
```

## API Integration Checklist

- [ ] Update `API_BASE_URL` in `src/services/api.ts`
- [ ] Replace mock OTP with real service
- [ ] Connect products API
- [ ] Implement cart sync
- [ ] Add error handling
- [ ] Add loading states
- [ ] Test all endpoints

## Common Issues & Fixes

### "Unable to resolve module"
```bash
npm install
npm start -- --reset-cache
```

### "Build failed" on Android
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### "Pod install failed" on iOS
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Metro bundler stuck
```bash
# Kill Metro process
# Windows: Ctrl+C
# Mac/Linux: Ctrl+C or kill process

# Restart
npm start -- --reset-cache
```

## Performance Tips

1. **Images**: Use optimized images (WebP format)
2. **Lists**: Use FlatList for long lists
3. **Animations**: Use native driver when possible
4. **Bundle**: Enable Hermes for better performance

## Deployment Checklist

### Android
- [ ] Update version in `android/app/build.gradle`
- [ ] Generate signed APK/AAB
- [ ] Test on multiple devices
- [ ] Optimize images
- [ ] Enable ProGuard

### iOS
- [ ] Update version in Xcode
- [ ] Configure signing
- [ ] Test on multiple devices
- [ ] Optimize images
- [ ] Archive and upload

## Useful Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## Project Stats

- **Screens**: 5
- **Components**: 3
- **Lines of Code**: ~1500+
- **Dependencies**: 15+
- **Platforms**: iOS & Android
- **Language**: TypeScript

---

**Need help?** Check the full README.md or SETUP_GUIDE.md
