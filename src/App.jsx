import './App.css';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './utils/redux/appStore';

// Components
import Feed from './components/Feed';
import Login from './components/Login';
import Profile from './components/Profile';
import Connections from './components/Connections';
import Request from './components/Request';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Chat from './components/Chat';
import ChatPage from './components/chat/ChatPage';
import PremiumList from './components/Premium/PremiumList';

// --- 1. Create the Protected Route Wrapper ---
// Allows access only if user is logged in, otherwise sends to Login
const ProtectedRoute = () => {
  const userData = useSelector((state) => state.user.user);
  return userData ? <Outlet /> : <Navigate to="/login" replace />;
};

// --- 2. Create the Public Route Wrapper ---
// Allows access only if user is logged OUT (e.g., Login page, Landing page)
// If they are already logged in, send them straight to Feed
const PublicRoute = () => {
  const userData = useSelector((state) => state.user.user);
  return !userData ? <Outlet /> : <Navigate to="/feed" replace />;
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="bottom-left" reverseOrder={false} />
        <Main />
      </PersistGate>
    </Provider>
  );
}

function Main() {
  return (
    <BrowserRouter basename='/'>
      <Navbar />

      <Routes>

        {/* --- Public Routes (Login, Home) --- */}
        {/* If user is logged in, these will auto-redirect to /feed */}
        <Route element={<PublicRoute />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
        </Route>

        {/* --- Protected Routes (Feed, Profile, Chat, etc.) --- */}
        {/* If user is NOT logged in, these will auto-redirect to /login */}
        <Route element={<ProtectedRoute />}>
          <Route path='/feed' element={<Feed />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/connections' element={<Connections />} />
          <Route path='/requests' element={<Request />} />

          {/* Chat Routes */}
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/chat/:targetUserId' element={<Chat />} />
          <Route path='/premiumList' element={<PremiumList />} />
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;