# 🍎 Fruit Shop E-Commerce App

A modern, production-ready React Native mobile application for buying fresh fruits online. Built with clean architecture, smooth animations, and a professional UI/UX design.

## ✨ Features

- **Landing Page**: Fullscreen carousel with offer banners and smooth autoplay
- **Authentication**: Login with OTP verification and Sign Up functionality
- **Dashboard**: Browse fruits by categories with beautiful product cards
- **Cart System**: Add items to cart (ready for backend integration)
- **Profile Management**: User profile with settings and logout
- **Bottom Navigation**: Smooth navigation between Home, Cart, and Profile

## 🎨 Design Highlights

- **Color Palette**: Green (#2ECC71), Light Greenish White (#F1F8E9), Yellow accent (#FFD54F)
- **Smooth Animations**: Bounce effects, gradient transitions, and fluid screen navigation
- **Responsive Layout**: Works seamlessly on both Android and iOS
- **Modern UI**: Card-based design with rounded corners, shadows, and gradients

## 🛠 Tech Stack

- **React Native** (0.82.1)
- **TypeScript**
- **React Navigation** (Native Stack & Bottom Tabs)
- **AsyncStorage** (for local data persistence)
- **Axios** (ready for API integration)
- **React Native Linear Gradient** (for beautiful gradients)
- **React Native Gesture Handler** (for smooth interactions)
- **React Native Reanimated** (for advanced animations)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Carousel.tsx
│   ├── FruitCard.tsx
│   └── Header.tsx
├── screens/            # App screens
│   ├── LandingScreen.tsx
│   ├── AuthScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── CartScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── services/          # API services (ready for backend)
│   └── api.ts
├── utils/             # Utility functions
│   └── storage.ts
├── constants/         # App constants and dummy data
│   ├── colors.ts
│   └── dummy-data.ts
└── assets/           # Images and static files
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

3. Start Metro bundler:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

5. Run on iOS:
```bash
npm run ios
```

## 🔌 API Integration (Ready)

The app is structured to easily integrate with backend APIs. All API endpoints are defined in `src/services/api.ts`:

- **Auth API**: `sendOTP`, `verifyOTP`, `signup`
- **Products API**: `getAll`, `getById`, `getByCategory`
- **Cart API**: `getCart`, `addItem`, `removeItem`, `updateQuantity`

Simply update the `API_BASE_URL` in `api.ts` and the app will work with your backend.

## 🎯 Current Features (Static/Dummy Data)

- ✅ Landing carousel with 3 offer banners
- ✅ Login with OTP (mock: use "1234")
- ✅ Sign Up form with validation
- ✅ Dashboard with 6 fruit categories
- ✅ 6 fruit products with images, prices, and ratings
- ✅ Add to Cart functionality (local state)
- ✅ Profile screen with menu items
- ✅ Logout functionality

## 📱 Demo Flow

1. **Landing Screen**: View carousel → Tap "Explore Now"
2. **Auth Screen**: Login with phone (any 10 digits) → Get OTP → Enter "1234" → Verify
3. **Dashboard**: Browse fruits → Filter by category → Add to cart
4. **Cart**: View cart items (currently shows empty state)
5. **Profile**: View profile → Access settings → Logout

## 🎨 Customization

### Colors
Edit `src/constants/colors.ts` to change the app's color scheme.

### Dummy Data
Edit `src/constants/dummy-data.ts` to modify carousel items, categories, and products.

### Images
Replace placeholder URLs in `dummy-data.ts` with your own images or add local images to `src/assets/images/`.

## 🔧 Development Notes

- All screens are TypeScript-based for type safety
- AsyncStorage is used for local data persistence
- Navigation uses React Navigation v6 with smooth transitions
- Components are modular and reusable
- Ready for Redux/Context API integration if needed

## 📦 Build for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace Fruit_Shop_ECommerce.xcworkspace -scheme Fruit_Shop_ECommerce -configuration Release
```

## 🐛 Troubleshooting

If you encounter issues:

1. Clear Metro cache: `npm start -- --reset-cache`
2. Clean Android build: `cd android && ./gradlew clean && cd ..`
3. Clean iOS build: `cd ios && xcodebuild clean && cd ..`
4. Reinstall dependencies: `rm -rf node_modules && npm install`

## 📄 License

This project is private and proprietary.

## 👨‍💻 Developer

Built with ❤️ for a production-ready fruit e-commerce experience.
