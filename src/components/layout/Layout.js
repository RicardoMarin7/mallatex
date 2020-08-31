import React, { useContext, useEffect } from 'react'
import Bar from './Bar'
import Sidebar from './Sidebar'

import AuthContext from '../../context/auth/authContext'


const Layout = props =>{
    //Extraer informacion
    const authContext = useContext(AuthContext)
    const { userAuthenticated } = authContext

    useEffect( ()=>{
        userAuthenticated()
    }, [])

    return(
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                    <Bar />
                    <main className="">
                        {props.children}
                    </main>
            </div>
        </div>
    )
}

export default Layout   