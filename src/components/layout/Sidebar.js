import React, { useContext } from 'react'
import Logo from '../../img/logo_dark.png'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const Sidebar = () =>{

    const authContext = useContext(AuthContext)
    const { user } = authContext

    let level = 1
    if(user){
        level = user.level
    }


    return(
        <aside>
            <img src={Logo} alt="Logo Mallatex" className="Logo__sidebar" />
            <nav className="Sidebar__menu">
                <ul className="Sidebar__PrincipalOptions">
                    <li>
                        <Link to="#!" className="Option">Ordenes</Link>
                        <ul className="Sidebar__hidden">

                            <li>
                                <Link to="/orders/new" className="Sidebar__suboption">Crear Nueva Orden</Link>
                            </li>

                            <li>
                                <Link to="#!" className="Sidebar__suboption">Ordenes</Link>
                            </li>

                        </ul>
                    </li>

                    <li>
                        <Link to="#!" className="Option">Requisiciones</Link>
                        <ul className="Sidebar__hidden">

                            <li>
                                <Link to="/requisitions/new" className="Sidebar__suboption">Nueva Requisicion</Link>
                            </li>

                            <li>
                                <Link to="/requisitions/" className="Sidebar__suboption">Requisiciones</Link>
                            </li>

                        </ul>
                    </li>

                    { level > 2 
                        ? (
                            <li>
                                <Link to="#!" className="Option">Articulos</Link>
                                <ul className="Sidebar__hidden">
        
                                    <li>
                                        <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
                                    </li>
        
                                    <li>
                                        <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
                                    </li>
        
                                </ul>
                            </li>
                        ) : null}



                    { level > 2 
                        ? (
                            <li>
                                <Link to="#!" className="Option">Proveedores</Link>
                                <ul className="Sidebar__hidden">

                                    <li>
                                        <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
                                    </li>

                                    <li>
                                        <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
                                    </li>

                                </ul>
                            </li>
                        ) : null}

                    

                { level > 2 
                ? (
                    <li>
                        <Link to="#!" className="Option">Usuarios</Link>
                        <ul className="Sidebar__hidden">

                            <li>
                                <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
                            </li>

                            <li>
                                <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
                            </li>

                        </ul>
                    </li>
                ) : null}

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar