import './App.css';
import React, { useCallback, useEffect, useState } from "react";
import GetCity from './Components/GetCity.js';
import Favorite from './Components/Favorite';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {store} from './ReduxStorage/store';
import {saveState} from './ReduxStorage/localStorage';
import Navbar from './NavbarComp'
import NavbarComp from './NavbarComp';
import { changeMode } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux';

  
store.subscribe(() => {
  saveState({
    cart:store.getState().cart
  });
});


function App() {
  const DarkMode = useSelector(state => state.isDark)

  useEffect(() => {
    console.log('redux result is ' + DarkMode)
  }, [DarkMode])


  const dispatch = useDispatch();

  const [isDark, setIsDark] = useState(false);

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
