import './App.css';
import React from 'react';
import GetCity from './Components/GetCity.js';
import Favorite from './Components/Favorite';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {store} from './ReduxStorage/store';
import {saveState} from './ReduxStorage/localStorage';
import Navbar from './NavbarComp'
import NavbarComp from './NavbarComp';
  
store.subscribe(() => {
  saveState({
    cart:store.getState().cart
  });
});


function App() {
  return (
    <div className="App">
      <NavbarComp/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetCity />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/Navbar" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
