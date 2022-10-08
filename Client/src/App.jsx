
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
  
} from "react-router-dom";


import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from './pages/success';
import{useEffect} from 'react';
import { useSelector } from "react-redux";
// import Products from "./components/Products";


window.Object.freeze = function(obj) { return obj }

const App = () => {
  // const user = useSelector((state) => state.user.currentUser);
  
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);   


  return (
    <Router>
      <div>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route  path="/products/:category">
             <ProductList />
          </Route>
          <Route  path="/product/:id">
            <Product />
          </Route>
          
          <Route path="/login">
            {/* {user ? <Redirect to='/' /> :  <Login />} */}
            <Login />
            
          </Route>
          <Route path="/register">
            {/* {user ? <Redirect to='/' /> : <Register />} */}

             <Register />            
          </Route> 
        
           <Route path="/cart">
                 <Cart />
          </Route>
         
         
         

         
        </Switch>
     </div>
  </Router>
  )
       
 
};

export default App;