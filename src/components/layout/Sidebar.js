import React, { useContext, useState } from 'react'
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

    const [subMenu, setSubMenu] = useState({
        orders: false,
        requisitions: false,
        articles: false,
        providers: false,
        users: false,
    })

    const { orders, requisitions, articles, providers, users } = subMenu


    return(
        <aside>
            <img src={Logo} alt="Logo Mallatex" className="Logo__sidebar" />
            <nav className="Sidebar__menu">
                <ul className="Sidebar__PrincipalOptions">
                    <li>
                        <button 
                            type="button" 
                            className="Option" 
                            onClick={ ()=> setSubMenu({
                                ...subMenu,
                                orders:!orders
                            })}
                        >Ordenes</button>
                        <ul className={`${ orders ? "Sidebar_show" : "Sidebar__hidden"}`}>

                            {level > 2 
                            ? (
                                <li>
                                    <Link to="/orders/new" className="Sidebar__suboption">Crear Nueva Orden</Link>
                                </li>
                            ) : null}
    
                            <li>
                                <Link to="/orders/" className="Sidebar__suboption">Mis Ordenes</Link>
                            </li>

                        </ul>
                    </li>

                    <li>
                        <button 
                            type="button"  
                            className="Option"
                                onClick={ ()=> setSubMenu({
                                    ...subMenu,
                                    requisitions:!requisitions
                                })}
                        >Requisiciones</button>
                        <ul className={`${ requisitions ? "Sidebar_show" : "Sidebar__hidden"}`}>

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
                                <button 
                                    type="button" 
                                    className="Option"
                                        onClick={ ()=> setSubMenu({
                                            ...subMenu,
                                            articles:!articles
                                        })}
                                >Articulos</button>
                                <ul className={`${ articles ? "Sidebar_show" : "Sidebar__hidden"}`}>
        
                                    <li>
                                        <Link to="/articles/new" className="Sidebar__suboption">Nuevo Articulo</Link>
                                    </li>
        
                                    <li>
                                        <Link to="/articles" className="Sidebar__suboption">Articulos</Link>
                                    </li>
        
                                </ul>
                            </li>
                        ) : null}



                    { level > 2 
                        ? (
                            <li>
                                <button 
                                    type="button" 
                                    className="Option"
                                        onClick={ ()=> setSubMenu({
                                            ...subMenu,
                                            providers:!providers
                                        })}
                                >Proveedores</button>
                                <ul className={`${ providers ? "Sidebar_show" : "Sidebar__hidden"}`}>

                                    <li>
                                        <Link to="/providers/new" className="Sidebar__suboption">Crear Nuevo Proveedor</Link>
                                    </li>

                                    <li>
                                        <Link to="/providers" className="Sidebar__suboption">Ver Proveedores</Link>
                                    </li>

                                </ul>
                            </li>
                        ) : null}

                    

                { level > 2 
                ? (
                    <li>
                        <button type="button
                            " to="/users" 
                            className="Option"
                                onClick={ ()=> setSubMenu({
                                    ...subMenu,
                                    users:!users
                                })}
                        >Usuarios</button>
                        <ul className={`${ users ? "Sidebar_show" : "Sidebar__hidden"}`}>
                            <li>
                                <Link to="/users/new" className="Sidebar__suboption">Nuevo Usuario</Link>
                            </li>

                            <li>
                                <Link to="/users" className="Sidebar__suboption">Ver Usuarios</Link>
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