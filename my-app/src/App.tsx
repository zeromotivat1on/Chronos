import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Layout from './common/components/Layout/Layout';
import Home from './pages/Home/Home';
import Calendars from './pages/Calendars/Calendars';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Register />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
        </Routes>
        <Layout>
          <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/calendars' element={<Calendars />}></Route>
            <Route path='/calendar/:id' element={<CalendarPage />}></Route>
          </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
