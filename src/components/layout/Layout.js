import React from 'react'
import Bar from './Bar'
import Sidebar from './Sidebar'

const Layout = props =>(
    <div className="contenedor-app">
        <Sidebar />
        <div className="seccion-principal">
                <Bar />
                <main className="container">
                    {props.children}
                </main>
        </div>
    </div>
)

export default Layout   