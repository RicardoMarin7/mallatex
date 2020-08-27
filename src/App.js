import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './components/auth/Login'
import NewAccount from './components/auth/NewAccount'
import Orders from './components/orders/Orders'
import NewOrder from './components/orders/NewOrder'
import MyOrders from './components/orders/MyOrders'
import AlertState from './context/alerts/alertsState'
import AuthState from './context/auth/authState';

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
      <AlertState>
        <AuthState>
          <BrowserRouter> 
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/orders" component={Orders}/>
                <Route exact path="/orders/new" component={NewOrder}/>
                <Route exact path="/orders/{id}" component={MyOrders}/>
                <Route exact path="/new-account" component={NewAccount}/>
              </Switch>
          </BrowserRouter>
      </AuthState>
    </AlertState>
  );
}

export default App;
