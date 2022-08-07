import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './app/components/navigation/Home';
import Login from './app/components/navigation/Login';
import Dashboard from './app/components/dashboard/Dashboard';
import Profile from './app/components/user/Profile';

// This is just for testing redux installation
import { Counter } from './features/counter/counter';
import './index.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Setup <AuthenticatedRoute> wrapper around Nav Root */}
        {/* Only Logged in users should visit dashboard */}
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/profile' element={<Profile/>} /> {/* Should load inside dashboard with side menu/etc.. */}
        {/* -------------------------------------------------- */}

        {/* Unprotected routes, like /login and /callback */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Counter/>} />
        {/* -------------------------------------------------- */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
