import './App.css';
import { BrowserRouter, Navigate, Route, Routes, Outlet, useLocation } from 'react-router-dom'; // 1. Import useLocation
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
import PremiumList from './components/premium/PremiumList';
import { UserProvider } from './utils/helper/UserContext.jsx';
import AiCoach from './components/ai/AiCoach.jsx';
import Footer from './components/Footer.jsx';
import Error404 from './components/Error404.jsx';


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

// --- Modified Main Component ---
function Main() {
  // We need to move BrowserRouter up to App to use useLocation here, 
  // OR we create a Layout component. 
  // However, since we are inside Main() which is inside <BrowserRouter> in the original code,
  // we need to restructure slightly to let Main use the hook.

  return (
    <BrowserRouter basename='/'>
      <AppContent />
    </BrowserRouter>
  );
}

// Create a sub-component so it can use the router hooks (useLocation)
function AppContent() {
  const location = useLocation();

  // Logic: True if the path starts with "/chat" (covers /chat and /chat/:id)
  const isChatPage = location.pathname.startsWith('/chat');

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />

      <div className="flex-grow">
        <Routes>

          {/* --- Public Routes --- */}
          <Route element={<PublicRoute />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
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
      </div>

      {/* Conditionally Render Footer */}
      {!isChatPage && <Footer />}

    </div>
  );
}

export default App;