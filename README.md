# 🚀 Dev-Tinder (Frontend)

**Dev-Tinder** is a full-stack social networking application designed specifically for developers. It leverages a Tinder-style swipe interface to connect developers based on tech stacks, experience, and interests.

This repository contains the **React.js Frontend**, built for performance, scalability, and real-time interaction.

🔗 **Live Demo: http://mypeg.in/
🔗 **Backend Repo: https://github.com/Guheshp/backend-devTinder

---

## 🛠️ Tech Stack

### Core Framework & State
* **React.js (Vite)**: Fast, modern frontend tooling.
* **Redux Toolkit**: Centralized state management for User, Feed, Connections, and Requests.
* **Redux Persist**: Persisting authentication state across reloads.
* **React Router DOM**: Client-side routing with Protected and Public route wrappers.

### UI & Styling
* **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
* **DaisyUI**: Component library for clean, consistent design elements (Modals, Dropdowns, Badges).
* **React Icons**: Lightweight icon library.
* **Glassmorphism**: Custom CSS for modern, translucent UI effects.

### Real-time & API
* **Socket.io-client**: Bi-directional communication for instant chat and online status.
* **Axios**: HTTP client with `withCredentials: true` for secure cookie handling.
* **Debouncing**: Custom logic for optimized search performance.

### Integrations
* **Razorpay**: Payment gateway integration for Premium subscriptions.
* **Google Gemini AI**: Generative AI integration for the "AI Career Coach" feature.
* **React Hot Toast**: Beautiful, animated notifications.

---

## ✨ Key Features

### 🔐 Authentication & Security
* **Secure Login/Signup**: JWT-based authentication using HttpOnly cookies.
* **Protected Routes**: Middleware-like components (`<ProtectedRoute />`, `<PublicRoute />`) to guard sensitive pages.
* **Auto-Logout**: Token expiration handling.

### 📱 Core User Experience
* **Connection Feed**: Optimized card stack to browse developer profiles.
* **Dynamic Pagination**: "Infinite" scrolling feel with smart pre-fetching logic to reduce load times.
* **Connection Management**: Send, Ignore, Accept, or Reject connection requests.

### 💬 Real-Time Chat
* **Instant Messaging**: Zero-latency messaging powered by Socket.io.
* **Live Status**: Real-time Online/Offline indicators.
* **Unread Badges**: Dynamic unread message counters in the Navbar and Side Profile, synchronized via sockets.

### 💎 Premium Membership
* **Tiered Plans**: Silver and Gold membership UI.
* **Razorpay Integration**: Seamless checkout flow.
* **Feature Gating**: Exclusive access to Search and AI features for premium users.

### 🤖 AI Career Coach
* **Gemini API**: Interactive AI chat interface for code reviews, bio optimization, and career advice.

### 🔍 Advanced Search
* **Debounced Input**: API calls are delayed (300ms) to prevent server overload while typing.
* **Dropdown UI**: LinkedIn-style instant search suggestions with user details modal.

---

## ⚡ Performance Optimizations

1.  **Code Splitting & Lazy Loading**: Secondary components (`SideProfile`, `RightFeed`) and routes are lazy-loaded using `React.lazy` and `Suspense` to improve **LCP (Largest Contentful Paint)**.
2.  **Asset Optimization**: Image priority handling (`loading="eager"` vs `loading="lazy"`) for feed cards.
3.  **Search Debouncing**: Prevents rapid API firing on every keystroke.
4.  **Socket Management**: Efficient connection handling to prevent memory leaks in `useEffect`.

---
