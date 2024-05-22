

![Duolingo thumb (1)](https://github.com/nmnarora600/duolingo-web/blob/main/public/images/mascot.svg).
# Duolingo Clone

## Disclaimer:
This is an unofficial clone of Duolingo, created primarily using Next.js 14 and TypeScript. This project is not affiliated with, endorsed,or sponsored by Duolingo. 
All logos, characters, and trademarks used on this site are the property of their respective owners and are used for educational and illustrative purposes only.

## Key Features:
- 🌐 Next.js 14 & server actions
- 🗣 AI Voices using Elevenlabs AI
- 🎨 Beautiful component system using Shadcn UI
- 🎭 Amazing characters thanks to KenneyNL
- 🔐 Auth using Clerk
- 🔊 Sound effects
- ❤️ Hearts system
- 🌟 Points / XP system
- 💔 No hearts left popup
- 🚪 Exit confirmation popup
- 🔄 Practice old lessons to regain hearts
- 🏆 Leaderboard
- 🗺 Quests milestones
- 🛍 Shop system to exchange points with hearts
- 💳 Pro tier for unlimited hearts using Stripe
- 🏠 Landing page
- 📊 Admin dashboard React Admin
- 🌧 ORM using DrizzleORM
- 💾 PostgresDB 
- 📱 Mobile responsiveness

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/nmnarora600/duolingo-web.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/learn
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/learn

STRIPE_API_KEY=""
NEXT_PUBLIC_APP_URL=""
STRIPE_WEBHOOK_SECRET=""

META_IMAGE=""
DUO_FAVICON_IMAGE=""

PG_HOST=""
PG_USER=""
PG_PWD=""
PG_DATABASE=""
PG_PORT=xxxx
```

### Setup Drizzle ORM

```shell
npm run db:push

```

### Seed the app


```shell
npm run db:prod

```

### Start the app

```shell
npm run dev
```
