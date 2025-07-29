import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreatePass from './pages/CreatePass';
import Home from'./routes/Home';
import Login from './pages/Login'; 

const App = () => {
  return (
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={
        <CreatePass />} />
        <Route path='/pages/Login' element={
          <Login />
        } />
      </Routes>
  );
};

export default App;
