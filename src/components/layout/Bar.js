import React, { useContext, useEffect } from 'react'

//Import Context
import AuthContext from '../../context/auth/authContext'


const Bar = () =>{
    const authContext = useContext(AuthContext)
    const { user, userAuthenticated , LogOut } = authContext

    useEffect(() => {
        userAuthenticated()
    },[])

    return(
        
        <header className="app-header">
            { user ? (<p className="nombre-usuario">Hola! <span>{user.name}</span> </p>) : null }
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => LogOut() } 
                >Log Out</button>
            </nav>
        </header>
    )
}

export default Bar