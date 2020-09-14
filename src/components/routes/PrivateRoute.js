import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const PrivateRoute = ({component: Component, ...props }) =>{

    const authContext = useContext(AuthContext)
    const { auth, userAuthenticated } = authContext

    useEffect( () =>{
        userAuthenticated()

    },[])

    const { path } = props

    let pathLevel = 1

    switch(path){
        case "/new-account":
            pathLevel = 3
            break;
    }

    return(
        <Route 
            {...props}
            render={ props => (!auth) ? ( <Redirect to={{pathname: '/'}} /> ) : ( <Component {...props} /> ) }
        />
    )
}

export default PrivateRoute