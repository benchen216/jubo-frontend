import React from 'react';
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './page/home';
// import ProductDetail from "./pages/product-detail";
// import Checkout from "./pages/checkout";
// import Search from "./pages/sreach";
// import ThankYou from "./pages/thankyou";
// import Login from "./pages/login";
// import SignUp from "./pages/sign-up";
// import Profile from "./pages/profile";

function App() {
  console.log( process.env.REACT_APP_API_BASE_PATH);
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}  />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;