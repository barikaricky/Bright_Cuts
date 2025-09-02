# GROOMOSPHERE

A mobile and web application that connects customers with professional barbers for on-demand haircuts at their location.

## Overview

GROOMOSPHERE is a platform where customers can book professional barbers for on-demand services, while barbers can manage their bookings and earnings. The platform operates on a commission-based model, taking 20% of each transaction.

## Features

### Customer Features
- 🏠 **Home Screen**: Search nearby barbers with real-time map integration
- 📅 **Booking System**: View barber profiles, ratings, and book services
- 💳 **Payment Integration**: Secure payments via Paystack/Flutterwave
- 🔔 **Notifications**: Real-time booking updates
- ⭐ **Reviews**: Rate and review barber services

### Barber Features
- 👤 **Profile Management**: Manage personal details and portfolio
- 📋 **Booking Management**: Accept/decline appointments
- 💰 **Earnings Dashboard**: Track income and performance
- 🟢 **Availability Status**: Toggle availability

### Admin Features
- ✅ **Barber Verification**: Approve barber registrations
- 📊 **Monitoring**: Track all platform activities
- 💵 **Revenue Management**: Manage payouts and earnings
- 🛠️ **Dispute Resolution**: Handle complaints

## Technology Stack

- **Mobile**: React Native (iOS & Android)
- **Web**: React.js + Next.js
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Real-time**: Socket.io
- **Payments**: Paystack/Flutterwave
- **Maps**: Google Maps API

## Project Structure

```
├── backend/          # Node.js API server
├── web/             # React.js web application
├── mobile/          # React Native mobile app
└── shared/          # Shared utilities and types
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- React Native development environment

### Installation

1. Clone the repository
```bash
git clone https://github.com/barikaricky/Bright_Cuts.git
cd Bright_Cuts
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install web dependencies
```bash
cd ../web
npm install
```

4. Install mobile dependencies
```bash
cd ../mobile
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the web application
```bash
cd web
npm run dev
```

3. Start the mobile application
```bash
cd mobile
npx expo start
```

## Design System

### Colors
- **Primary**: Deep Blue (#003366)
- **Secondary**: Bright Yellow (#FFD700)
- **Accent**: Light Gray (#F2F2F2)
- **Text**: Dark Gray (#333333), Medium Gray (#666666)

### Typography
- **Primary**: Poppins (Sans-serif)
- **Secondary**: Roboto (Sans-serif)

## License

This project is licensed under the MIT License.