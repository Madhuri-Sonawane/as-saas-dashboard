# 🤖 AI SaaS Dashboard

A full-stack AI-powered SaaS dashboard built with React, Firebase, and Google Gemini. Features a real-time AI chat assistant, conversation history, usage analytics, dark mode, and a fully responsive design.

![AI SaaS Dashboard](https://img.shields.io/badge/React-19-blue?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange?logo=firebase)
![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-green?logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)

---

## ✨ Features

- 🔐 **Authentication** — Email/password and Google OAuth via Firebase Auth
- 🤖 **AI Chat Assistant** — Real-time chat powered by Google Gemini API
- 📊 **Dashboard Analytics** — Stats cards, weekly usage chart, and recent activity
- 🕐 **Conversation History** — All chats saved to Firestore with search and delete
- ⚙️ **Settings Page** — Update profile, change password, view usage stats
- 🌙 **Dark Mode** — Full dark/light theme toggle with persistence
- 📱 **Responsive Design** — Mobile-friendly with collapsible sidebar and hamburger menu
- 💬 **Markdown Rendering** — AI responses render with proper formatting, code blocks, and tables

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + Vite | Frontend framework and build tool |
| Tailwind CSS v4 | Styling and UI design |
| Firebase Auth | User authentication |
| Firebase Firestore | Database for chat history |
| Google Gemini API | AI chat responses |
| React Router v6 | Client-side routing |
| Recharts | Usage analytics chart |
| React Markdown | Rendering AI markdown responses |
| Lucide React | Icons |
| React Hot Toast | Toast notifications |

---

## 📁 Project Structure

```
ai-saas-dashboard/
├── src/
│   ├── components/
│   │   ├── ai/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   └── PromptInput.jsx
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── dashboard/
│   │   │   ├── RecentActivity.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── UsageChart.jsx
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       ├── PageWrapper.jsx
│   │       └── Sidebar.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── AIAssistantPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   └── SettingsPage.jsx
│   ├── services/
│   │   ├── firebase.js
│   │   └── gemini.js
│   ├── constants/
│   │   └── index.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-saas-dashboard.git
cd ai-saas-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Email/Password and Google providers
4. Enable **Firestore Database** in test mode
5. Copy your config values into `.env`

### 5. Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to `.env` as `VITE_GEMINI_API_KEY`

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables from `.env` in the Vercel dashboard
4. Click **Deploy**

---

## 📸 Screenshots

### Dashboard
> Stats cards, weekly usage chart, and recent activity feed

### AI Assistant
> Real-time chat with Google Gemini — supports markdown, code blocks, and tables

### History
> All past conversations saved with search and delete functionality

### Settings
> Update profile name, change password, and view usage statistics

### Dark Mode
> Full dark/light theme toggle with localStorage persistence

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_GEMINI_API_KEY` | Google Gemini API key |

> ⚠️ Never commit your `.env` file. It is already added to `.gitignore`.

---

## 🧠 What I Learned

- Building a full-stack React app from scratch with Vite
- Firebase Authentication with email/password and Google OAuth
- Firestore real-time database for storing and querying user data
- Integrating Google Gemini AI API for chat functionality
- Context API for global state management (Auth + Theme)
- Tailwind CSS v4 with dark mode support
- React Router v6 with protected routes
- Building responsive layouts with mobile sidebar
- Rendering markdown responses from AI using `react-markdown`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

Built with ❤️ as a portfolio project to demonstrate full-stack React development skills.

- Madhuri Sonawane
```
