import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './components/auth/Login';
import Orders from './components/orders/Orders'
import NewOrder from './components/orders/NewOrder'
import MyOrders from './components/orders/MyOrders'

function App() {
  return (
    <BrowserRouter> 
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/orders" component={Orders}/>
          <Route exact path="/orders/new" component={NewOrder}/>
          <Route exact path="/orders/{id}" component={MyOrders}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
