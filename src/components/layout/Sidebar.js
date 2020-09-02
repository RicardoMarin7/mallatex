import React from 'react'
import Logo from '../../img/logo_dark.png'
import { Link } from 'react-router-dom'

const Sidebar = () =>{

    const handleClick = e => {
        console.log(e.target)
        // console.log(e.target.classList.toggle('hidden'))

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
                                <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
                            </li>

                            <li>
                                <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
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
                                <Link to="/orders/new" className="Sidebar__suboption">Orders</Link>
                            </li>

                        </ul>
                    </li>

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

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar