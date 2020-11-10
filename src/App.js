import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//Higher Component
import PrivateRoute from './components/routes/PrivateRoute'

//Components
  //Auth-Users
import Login from './components/auth/Login'
import NewAccount from './components/auth/NewAccount'
import Users from './components/auth/Users'

  //Orders
import Orders from './components/orders/Orders'
import NewOrder from './components/orders/NewOrder'

  //Requisitions
import NewRequisition from './components/requisition/NewRequisition'
import Requisitions from './components/requisition/Requisitions'

//State
import AlertState from './context/alerts/alertsState'
import AuthState from './context/auth/authState';
import OrdersState from './context/orders/ordersState';
import RequisitionState from './context/requisition/requisitionState';

//Articles
import Articles from './components/articles/Articles'
import NewArticle from './components/articles/NewArticle'

//Providers
import Providers from './components/providers/Providers'
import NewProvider from './components/providers/NewProvider'

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
        <RequisitionState>
          <AlertState>
            <AuthState>
              <BrowserRouter> 
                  <Switch>
                    <Route exact path="/" component={Login}/>
                    {/* Orders */}
                    <PrivateRoute exact path="/orders" component={Orders} />
                    <PrivateRoute exact path="/orders/new" component={NewOrder}/>

                    {/* Requisitions */}
                    <PrivateRoute exact path="/requisitions/new" component={NewRequisition}/>
                    <PrivateRoute exact path="/requisitions" component={Requisitions}/>

                    {/* Usuarios */}
                    <PrivateRoute exact path="/users/new" component={NewAccount}/>
                    <PrivateRoute exact path="/users" component={Users}/>

                    {/* Articulos */}
                    <PrivateRoute exact path="/articles" component={Articles}/>
                    <PrivateRoute exact path="/articles/new" component={NewArticle}/>

                    {/* Proveedores */}
                    <PrivateRoute exact path="/providers" component={Providers}/>
                    <PrivateRoute exact path="/providers/new" component={NewProvider}/>
                  </Switch>
              </BrowserRouter>
          </AuthState>
        </AlertState>
      </RequisitionState>
    </OrdersState>
  )
}

export default App;
