import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Body from './components/Body';
import Feed from './components/Feed';
import Login from './components/Login';
import Profile from './components/Profile';
import Connections from './components/Connections';
import Request from './components/Request';
import Navbar from './components/Navbar'; // Assuming you want to use this
import HomePage from './components/HomePage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './utils/redux/appStore';
import Chat from './components/Chat';
import ChatPage from './components/chat/ChatPage';

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
  const userData = useSelector((state) => state.user.user);

  return (
    <BrowserRouter basename='/'>
      <Navbar />

      <Routes>
        <Route path='/' element={userData ? <Navigate to="/feed" /> : <HomePage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={userData ? <Navigate to="/" /> : <Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/connections' element={<Connections />} />
        <Route path='/requests' element={<Request />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/chat/:targetUserId' element={<Chat />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
