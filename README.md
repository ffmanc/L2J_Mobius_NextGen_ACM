# L2J Mobius NextGen ACM (Account Control Manager)

L2J Mobius NextGen ACM is a premium, modern, and highly responsive web-based account management interface designed specifically for L2J Mobius servers (Essence/Vanguard). Built with **Next.js 14**, **Prisma**, **TypeScript**, and **Framer Motion**, it provides a stunning dark-themed experience with real-time server metrics.

---

## 🚀 Main Features

- **Premium Dark UI**: Modern aesthetics with glassmorphism, gradients, and smooth animations.
- **Real-time Server Status**: Dynamic header widget showing Login and Game server connectivity.
- **Multilingual Support**: Fully localized in English, Portuguese, Spanish, German, and Russian.
- **Light/Dark Mode**: Integrated theme toggle for user preference.
- **Responsive Design**: Optimized for Desktop and Mobile (Full-screen forms on mobile).
- **Prisma Integration**: Direct and secure database access for account and character management.

---

## 🛠️ Requirements

- **Node.js**: 18.17.0 or higher.
- **Database**: MariaDB 11+ or MySQL 8+.
- **Memory**: 512MB RAM minimum (1GB recommended for production).

---

## 📥 Local Installation (Windows & Linux)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/L2J_Mobius_ACM_NextJS.git
cd L2J_Mobius_ACM_NextJS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (use `.env.example` as a template):
```bash
cp .env.example .env
```
Update the `DATABASE_URL` with your database credentials:
`DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/l2jmobius"`

### 4. Setup the Database
Sync the Prisma schema with your existing L2J Mobius database:
```bash
npx prisma generate
```

### 5. Run the Application
**Development mode:**
```bash
npm run dev
```
**Production Build:**
```bash
npm run build
npm start
```

---

## 🌐 Cloud Deployment (Hosted)

L2J Mobius NextGen ACM is optimized for fast and easy deployment on modern cloud platforms.

### 1. Vercel (Recommended - FREE)
1. Push your code to a GitHub repository.
2. Link the repository to [Vercel](https://vercel.com).
3. Add your `.env` variables in the Vercel Project Settings.
4. Vercel will automatically build and deploy the application.

### 2. Render (Alternative - FREE/Paid)
1. Connect your GitHub repository to [Render](https://render.com).
2. Create a new "Web Service".
3. Add your Environment Variables.
4. Render will handle the `npm run build` and `npm start` commands.

### 3. Database Hosting
Since cloud platforms like Vercel skip the persistent database, you need a remote MariaDB/MySQL instance. Suggestions:
- **Aiven.io** (Free/Paid MariaDB)
- **Railway.app** (Paid/Trial MySQL)
- **Supabase** (Postgres only - not recommended for Mobius defaults)

---

## 🔧 Configuration (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | MariaDB/MySQL Connection String | `mysql://...` |
| `LOGIN_HOST` | Hostname of your Login Server | `localhost` |
| `LOGIN_PORT` | Port of your Login Server | `2106` |
| `GAME_HOST` | Hostname of your Game Server | `localhost` |
| `GAME_PORT` | Port of your Game Server | `7777` |

---

## 📜 License

This project is intended for educational and private server management purposes. Open Source & Free.

---

*Developed with ❤️ for the L2J Mobius Community.*
