import React from 'react'
import Logo from '../../img/logo_dark.png'
import { Link } from 'react-router-dom'

const Sidebar = () =>{
    return(
        <aside>
            <img src={Logo} alt="Logo Mallatex" className="Logo__sidebar" />
            <div className="Options__container">
                <Link to="/orders/new" className="Option">Nueva Orden</Link>
                <Link to="#!" className="Option">Mis Ordenes</Link>
                <Link to="#!" className="Option">Ordenes</Link>
                <Link to="#!" className="Option">Articulos</Link>
                <Link to="#!" className="Option">Proveedores</Link>
                <Link to="#!" className="Option">Usuarios</Link>
            </div>
        </aside>
    )
}

export default Sidebar