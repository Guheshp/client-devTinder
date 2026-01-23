import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './utils/redux/appStore';
import { UserProvider } from './utils/helper/UserContext.jsx';

// --- UI Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import TopBarLoader from './utils/ui/TopBarLoader.jsx'; // The new subtle loader

// --- 1. EAGER LOAD CRITICAL PAGES (Instant Navigation) ---
// These are fetched immediately so the user never sees a loading spinner for them.
import HomePage from './components/HomePage';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';
import ChatPage from './components/chat/ChatPage';
import Chat from './components/Chat';

// --- 2. LAZY LOAD HEAVY/RARE PAGES (Bundle Splitting) ---
// These are only downloaded when the user actually clicks on them.
const Connections = lazy(() => import('./components/Connections'));
const Request = lazy(() => import('./components/Request'));
const PremiumList = lazy(() => import('./components/premium/PremiumList'));
const AiCoach = lazy(() => import('./components/ai/AiCoach.jsx'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword.jsx'));
const Error404 = lazy(() => import('./components/Error404.jsx'));

// --- Route Guards ---
const ProtectedRoute = () => {
  const userData = useSelector((state) => state.user.user);
  return userData ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const userData = useSelector((state) => state.user.user);
  return !userData ? <Outlet /> : <Navigate to="/feed" replace />;
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserProvider>
          <Toaster position="bottom-left" reverseOrder={false} />
          <Main />
        </UserProvider>
      </PersistGate>
    </Provider>
  );
}

function Main() {
  return (
    <BrowserRouter basename='/'>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat');

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />

      <div className="flex-grow relative">
        {/* Use TopBarLoader here. 
            It only shows up if the user visits a 'lazy' page (like AiCoach).
            For Feed/Profile/Chat, this Suspense will NOT trigger (because they are eager).
        */}
        <Suspense fallback={<TopBarLoader />}>
          <Routes>

            {/* --- Public Routes --- */}
            <Route element={<PublicRoute />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/reset-password/:token' element={<ResetPassword />} />
            </Route>

            {/* --- Protected Routes --- */}
            <Route element={<ProtectedRoute />}>
              {/* Critical Pages (No Loader) */}
              <Route path='/feed' element={<Feed />} />
              <Route path='/profile' element={<Profile />} />

              {/* Chat Pages (No Loader) */}
              <Route path='/chat' element={<ChatPage />} />
              <Route path='/chat/:targetUserId' element={<Chat />} />

              {/* Heavy/Secondary Pages (Shows TopBarLoader on first visit) */}
              <Route path='/connections' element={<Connections />} />
              <Route path='/requests' element={<Request />} />
              <Route path='/premiumList' element={<PremiumList />} />
              <Route path='/ai-coach' element={<AiCoach />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Error404 />} />

          </Routes>
        </Suspense>
      </div>

      {!isChatPage && <Footer />}
    </div>
  );
}

export default App;