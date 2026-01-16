# 🏦 Elevens Bank UI

A modern, responsive React-based web application for Elevens Bank, providing a comprehensive banking experience with account management, transactions, loans, cards, and notifications.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Elevens Bank UI is a single-page application (SPA) built with React that connects to a microservices-based backend. It provides users with a seamless banking experience including:

- Secure authentication with JWT tokens
- Real-time account information
- Transaction history and management
- Loan applications and tracking
- Card management
- Notification center
- User profile management

## ✨ Features

- **🔐 Secure Authentication**: JWT-based authentication with automatic token refresh
- **📊 Dashboard**: Comprehensive overview of accounts and recent activities
- **💳 Account Management**: View and manage multiple bank accounts
- **💸 Transactions**: Send money, view transaction history
- **🏠 Loan Management**: Apply for loans, track loan status
- **💳 Card Management**: Manage credit and debit cards
- **🔔 Notifications**: Real-time updates and alerts
- **👤 Profile Management**: Update personal information and preferences
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **♿ Accessible**: WCAG 2.1 compliant with keyboard navigation support

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.x or higher
- **npm**: v8.x or higher (comes with Node.js)
- **Git**: Latest version

Optional for Docker deployment:
- **Docker**: v20.x or higher
- **Docker Compose**: v2.x or higher

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/ShrikarMukesh/elevens-bank-ui.git
cd elevens-bank-ui
```

2. **Install dependencies**

```bash
npm install
```

## ⚙️ Configuration

1. **Create environment file**

Copy the example environment file and configure your backend API endpoints:

```bash
cp .env.example .env
```

2. **Configure environment variables**

Edit `.env` and update the API endpoints to match your backend services:

```env
REACT_APP_AUTH_API=http://localhost:7001
REACT_APP_CUSTOMER_API=http://localhost:6001
REACT_APP_NOTIFICATION_API=http://localhost:5001
REACT_APP_TRANSACTION_API=http://localhost:4001
REACT_APP_ACCOUNT_API=http://localhost:3001
REACT_APP_CARDS_API=http://localhost:8001
REACT_APP_LOANS_API=http://localhost:9001
```

> **Note**: Ensure your backend services are running before starting the UI application.

## 🚀 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:

```bash
npm run build
```

This creates an optimized build in the `build/` directory.

### Serve Production Build Locally

To test the production build locally:

```bash
npm install -g serve
serve -s build -l 3000
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t elevens-bank-ui:latest .
```

### Run with Docker

```bash
docker run -p 3000:80 elevens-bank-ui:latest
```

### Using Docker Compose

```bash
docker-compose up -d
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
elevens-bank-ui/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   ├── favicon.ico        # App icon
│   └── manifest.json      # PWA manifest
├── src/
│   ├── api/               # API service layer
│   │   ├── axios.js       # Axios instances with interceptors
│   │   ├── authApi.js     # Authentication endpoints
│   │   ├── accountService.js
│   │   ├── cardsService.js
│   │   ├── customerService.js
│   │   ├── loansService.js
│   │   ├── transactionService.js
│   │   └── notificationService.js
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorBoundary.jsx
│   ├── context/           # React context providers
│   │   ├── AuthContext.jsx
│   │   └── LoadingContext.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useLoading.js
│   ├── layouts/           # Layout components
│   │   └── DashboardLayout.jsx
│   ├── pages/             # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Accounts.jsx
│   │   ├── Transactions.jsx
│   │   ├── Loans.jsx
│   │   ├── Cards.jsx
│   │   ├── Notifications.jsx
│   │   └── Profile.jsx
│   ├── routes/            # Routing configuration
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoute.jsx
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Root component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── Dockerfile            # Docker build configuration
├── docker-compose.yml    # Docker Compose configuration
├── nginx.conf            # Nginx configuration for production
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 📜 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## 🔌 API Integration

The application integrates with the following backend microservices:

| Service | Port | Description |
|---------|------|-------------|
| Auth Service | 7001 | Authentication and authorization |
| Customer Service | 6001 | Customer profile management |
| Notification Service | 5001 | Notifications and alerts |
| Transaction Service | 4001 | Transaction processing |
| Account Service | 3001 | Account management |
| Cards Service | 8001 | Card management |
| Loans Service | 9001 | Loan applications |

### Authentication Flow

1. User logs in via `/auth/login`
2. Backend returns JWT `accessToken` and `refreshToken`
3. Access token stored in memory and localStorage
4. Refresh token used for automatic token renewal
5. Axios interceptors attach token to all requests
6. Automatic logout on token expiration

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Test Structure

```
src/
├── components/__tests__/
├── pages/__tests__/
└── utils/testUtils.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is part of the Elevens Bank microservices ecosystem.

## 🔗 Related Repositories

- [Elevens Bank Backend](https://github.com/ShrikarMukesh/elevens-bank) - Microservices backend

## 📞 Support

For issues and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Built with ❤️ using React, TailwindCSS, and modern web technologies**
