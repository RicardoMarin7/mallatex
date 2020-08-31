import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//Higher Component
import PrivateRoute from './components/routes/PrivateRoute'

//Components
import Login from './components/auth/Login'
import NewAccount from './components/auth/NewAccount'
import Orders from './components/orders/Orders'
import NewOrder from './components/orders/NewOrder'

//State
import AlertState from './context/alerts/alertsState'
import AuthState from './context/auth/authState';
import OrdersState from './context/orders/ordersState';

//Other
import AuthToken from './config/authToken'

//revisar si tenemos token
const token = localStorage.getItem('mallatex-token')
if(token){
  AuthToken(token)
}

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
      <OrdersState>
        <AlertState>
          <AuthState>
            <BrowserRouter> 
                <Switch>
                  <Route exact path="/" component={Login}/>
                  <PrivateRoute exact path="/orders" component={Orders}/>
                  <PrivateRoute exact path="/orders/new" component={NewOrder}/>
                  <PrivateRoute exact path="/new-account" component={NewAccount}/>
                </Switch>
            </BrowserRouter>
        </AuthState>
      </AlertState>
    </OrdersState>
  )
}

export default App;
