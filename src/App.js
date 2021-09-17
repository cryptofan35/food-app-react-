import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from './components/auth/SignIn'
import Otp from './components/auth/Otp'
import Dashboard from './components/layouts/Dashboard'
import ItemDetails from './components/Items/Itemdetails'
import Summary from './components/payment/orderSummary'
import Order from './components/history/orderStatus'
import About from './components/layouts/About'
import NotFoundPage from './components/404/NotFoundPage';
import Success from './components/payment/Success'; 
import Failed from './components/payment/Failed';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/validate/otp" component={Otp} />
        <Route path="/home" component={Dashboard} />
        <Route path="/item/:id" component={ItemDetails} />
        <Route path="/summary" component={Summary} />
        <Route path="/orders" component={Order} />
        <Route path="/about" component={About} />
        <Route path="/success" component={Success} />
        <Route path="/error" component={Failed} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
