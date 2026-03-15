# L2J Mobius NextGen ACM (Account Control Manager)

L2J Mobius NextGen ACM is a premium, modern, and highly responsive web-based account management interface designed specifically for L2J Mobius servers. Built with **Next.js 14**, **Prisma**, **TypeScript**, and **Framer Motion**, it provides a stunning dark-themed experience with real-time server metrics.

---

## 🚀 Key Features

### 👤 For Players
- **Account Management**: Secure login and management of account credentials.
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
Made with ❤️ for L2J Mobius Community. Powered by **Next.js** and **L2J Mobius**.
