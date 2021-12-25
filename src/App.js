import './App.css';
import React from 'react';
import GetCity from './Components/GetCity.js';
import Favorite from './Components/Favorite';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import CartContainer from "./ReduxStorage/CartContainer";
import CartItem from "./ReduxStorage/CartItem";
import {store} from './ReduxStorage/store';
import {saveState} from './ReduxStorage/localStorage';
// import Container from "./Container";

  
store.subscribe(() => {
  saveState({
    cart:store.getState().cart
    // total:store.getState().total,
    // amount: store.getState().amount
  });
});

// const cartItems = [
//   {
//     id: 1,
//     title: "Samsung",
//     price: 799.99,
//     img:
//       "shorturl.at/ajkq9",
//     amount: 1
//   },
//   {
//     id: 2,
//     title: "Google pixel Max",
//     price: 399.99,
//     img:
//       "shorturl.at/ajkq9",
//     amount: 1
//   },
//   {
//     id: 3,
//     title: "Xiaomi",
//     price: 999.99,
//     img:
//       "shorturl.at/ajkq9",
//     amount: 1
//   }
// ];

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<GetCity />} /> 
          <Route path="/favorite" element={<Favorite/>} />
          {/* <Route path="/redux" element={<Container />} /> */}
          <Route path="/n" element={
            <Provider store={store}>
            <CartContainer cart={CartItem} />
          </Provider>
          }/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
