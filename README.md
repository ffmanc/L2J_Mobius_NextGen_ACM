# L2 NextGen ACM (Account Control Manager)

> [!IMPORTANT]
> **DEVELOPER COMPLIANCE REQUIRED**: All contributions must strictly follow the [Project Coding Standards](file:///C:/Users/FFMANC/.gemini/antigravity/brain/0ccd676e-d95d-4058-adab-b1ffff83b01e/coding_standards.md). Failure to adhere to standards (e.g., PowerShell file edits, missing documentation, or branding deviations) is not permitted.

L2 NextGen ACM is a premium, modern, and highly responsive web-based account management interface designed specifically for L2J Mobius servers. Built with **Next.js 14**, **Prisma**, **TypeScript**, and **Framer Motion**, it provides a stunning dark-themed experience with real-time server metrics.

---

## 🚀 Key Features

### 👤 For Players
- **Modular Auth System**: Stunning, animated, and unified interface for all authentication flows.
- **Account Registration**: Secure account creation with real-time validation and legacy hashing support.
- **Password Recovery**: Integrated recovery system with email-based identity verification.
- **Character Management**: Full overview of characters, levels, and stats.
- **Donation Management**: Integrated system for managing contributions.
- **Payment Gateways**: Support for multiple commercial payment methods.
- **Auto Delivery**: Automatic item delivery after donation confirmation.
- **VIP & Voting**: Dedicated systems for VIP status and server voting rewards.

### 🛡️ For Administrators
- **Advanced Admin Tools**: Comprehensive dashboard for player and server oversight.
- **Item Management**: Tools for item "blessing" and inventory control.
- **Stats Editing**: Real-time adjustment of character statistics and levels.
- **Live Metrics**: Real-time tracking of Online Players, GMs, and Server Status.

---

## 💻 Tech Stack (NextGen)

Built with the latest and most efficient technologies for maximum performance and security:

| Component     | Technology       | Description                                |
| :------------ | :--------------- | :----------------------------------------- |
| **Framework** | **Next.js 14**   | SSR, App Router, and Edge runtime support. |
| **Language**  | **TypeScript 5** | Static typing for enterprise-grade stability. |
| **Database**  | **Prisma ORM**   | Type-safe queries for MySQL and MariaDB.   |
| **Animation** | **Framer Motion**| GPU-accelerated smooth UI transitions.     |
| **Styling**   | **Vanilla CSS**  | Modern CSS Variables for zero-latency theming. |
| **Auth**      | **NextAuth v5**  | Secure JWT-based authentication and RBAC.  |
| **Icons**     | **Lucide React** | Over 600+ optimized SVG vector icons.      |
| **Runtime**   | **Node.js / Edge**| Blazing fast Server Actions execution.     |

---

## 🛠️ Requirements

- **Node.js**: 18.17.0 or higher.
- **Database**: MariaDB 11+ or MySQL 8+.
- **Memory**: 512MB RAM minimum (1GB recommended for production).

---

## 📥 Installation Guide

### 1. Pre-installation
Ensure you have Node.js and a database (MariaDB/MySQL) ready.

### 2. Implementation
```bash
git clone https://github.com/ffmanc/L2J_Mobius_NextGen_ACM.git
cd L2J_Mobius_NextGen_ACM
npm install
```

### 3. Configuration
Create a `.env` file (use `.env.example` as a template):
```bash
cp .env.example .env
```
Update `DATABASE_URL` with your credentials:
`DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/l2jmobius"`

### 4. Database Setup
```bash
npx prisma generate
```

### 5. Start Application
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## 🌐 Cloud Deployment

The L2J Mobius NextGen ACM is optimized for:
- **Vercel** (One-click deployment, FREE tier available)
- **Render** (Easy "Web Service" hosting)
- **Docker** (Full containerization support)

---

## 📜 License & Credits

This is a Free & Open Source Project. Customization and setup may be charged if requested.
Made with ❤️ for L2J Community. Powered by **Next.js** and **L2 NextGen**.

---

## Latest Features (Dashboard Phase 2)
- **NG Currency System**: Fully integrated NG coin system with coin pile icons.
- **Bonus Credit System**: Automated 5% bonus for every 10 NG coins purchased.
- **Premium Payment Interface**: Centralized modal with preset and manual recharge options.
- **Dynamic Theme & Language Toggles**: Dashboard controls in sync with the landing page design.
- **Smart Loader**: Navigation-intelligent pre-loader (skips on errors/404).
- **Dashboard Compact Excellence**: Optimized margins, paddings, and font sizes for a more modern, data-dense, and efficient management experience.
- **Intelligent Sidebar**: Implemented a "Collapsed State" where only icons are visible, maximizing workspace while maintaining rapid navigation.
- **Branding Excellence**: Refined L2 NextGen ACM visual identity with original right-justified subtext alignment and mixed-case "Powered by NextJS".
