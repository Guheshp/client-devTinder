import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './utils/redux/appStore';
import { UserProvider } from './utils/helper/UserContext.jsx';
import { CgSpinner } from "react-icons/cg";

// --- Layout Components (Load Instantly) ---
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import HeartbeatLoader from './utils/ui/HeartbeatLoader.jsx';

// --- Lazy Load Page Components ---
// This splits your bundle into smaller chunks. 
// The browser only downloads the code for the page the user is actually visiting.
const HomePage = lazy(() => import('./components/HomePage'));
const Login = lazy(() => import('./components/Login'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword.jsx'));
const Feed = lazy(() => import('./components/Feed'));
const Profile = lazy(() => import('./components/Profile'));
const Connections = lazy(() => import('./components/Connections'));
const Request = lazy(() => import('./components/Request'));
const ChatPage = lazy(() => import('./components/chat/ChatPage'));
const Chat = lazy(() => import('./components/Chat'));
const PremiumList = lazy(() => import('./components/premium/PremiumList'));
const AiCoach = lazy(() => import('./components/ai/AiCoach.jsx'));
const Error404 = lazy(() => import('./components/Error404.jsx'));

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

      <div className="flex-grow">
        {/* Suspense handles the loading state while the lazy component is fetched */}
        <Suspense fallback={<HeartbeatLoader />}>
          <Routes>

            {/* --- Public Routes --- */}
            <Route element={<PublicRoute />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/reset-password/:token' element={<ResetPassword />} />
            </Route>

            {/* --- Protected Routes --- */}
            <Route element={<ProtectedRoute />}>
              <Route path='/feed' element={<Feed />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/connections' element={<Connections />} />
              <Route path='/requests' element={<Request />} />

              {/* Chat Routes */}
              <Route path='/chat' element={<ChatPage />} />
              <Route path='/chat/:targetUserId' element={<Chat />} />
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