import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Components/Nav';
import Login from './Components/Login';
import Upload from './Components/Upload';
import HomePage from './Components/Home'; 
import { UserContextProvider } from './Components/UserContext';

export default function App() {
  const location = useLocation();


  const noNavPaths = ['/register', '/login'];

  return (
    <div>
      <UserContextProvider>
        
        {!noNavPaths.includes(location.pathname) && <Nav />}
        <Routes>
          <Route index element={<HomePage />} /> 
          <Route path="/register" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}
