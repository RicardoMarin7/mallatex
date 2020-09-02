import React, { useState, useContext, useEffect } from 'react'

import Layout from '../layout/Layout'
import SearchBar from '../utility/SearchBar'
import ArticleList from '../utility/ArticleList'

import AuthContext from '../../context/auth/authContext'
import OrdersContext from '../../context/orders/ordersContext'

const NewOrder = () =>{

    const today = e =>{
        let fecha = new Date()
        let dia = String(fecha.getDate()).padStart(2,'0')
        let mes = String(fecha.getMonth() + 1).padStart(2,'0')
        let anho = fecha.getFullYear()

        return fecha = `${anho}-${mes}-${dia}`
    }

    const authContext = useContext(AuthContext)
    const { user } = authContext

    const ordersContext = useContext(OrdersContext)
    const { getArticles, getProviders,selectedProvider } = ordersContext

    useEffect( () =>{
        getProviders()
        getArticles()
        
    },[])


    const [order,setOrder] = useState({
        fecha:today(),
        fechadecompra:'',
        moneda:'mxn',
        proveedor:'',
        departamento_proveedor:'',
        direccion_proveedor:'',
        email_proveedor:'',
        telefono_proveedor:'',
        empleado:'',
        empresa_empleado:'Tejidos Tecnicos Mallatex S.A. De C.V.',
        direccion_empleado:'',
        email_empleado:'',
        telefono_empleado:'',
        enviado_mediante:'',
        fob:'',
        empleado_envio:'',
    })    

    const handleChange = e =>{
        setOrder({
            ...order,
            [e.target.name]:e.target.value
        })
    }
    

    return(
        <Layout>
            <form>
                <div className="row">
                    {/* Empieza Encabezado */}
                    <div className="Orden__empresa one-half column">
                        <h4>Tejidos Tecnicos Mallatex S.A. De C.V.</h4>
                        <p className="Orden__empresa-datos">Av. Iturbide #5210, Zapopan, Jal.</p>
                        <p className="Orden__empresa-datos"><span>Teléfono:</span> 3320164875</p>
                        <p className="Orden__empresa-datos"><span>Email:</span> <a href = "mailto:mallatex@mallatex.com.mx">mallatex@mallatex.com.mx</a></p>
                        <p className="Orden__empresa-datos"><span>Sitio Web:</span> <a href = "https://mallatex.com.mx/" target="_blank" rel="noopener noreferrer">https://mallatex.com.mx/</a></p>
                    </div>

                    <div className="Orden__fecha-folio one-half column">
                        <label className="d-inline  " htmlFor="fecha">Fecha </label>
                        <input type="date" name="fecha" value={today()} readOnly/>
                    <br/>

                        <label className="d-inline" htmlFor="folio">Folio </label>
                        <input type="number" name="folio" value="1" readOnly/>
                    <br/>

                        <label className="d-inline" htmlFor="fechadecompra">Fecha de Compra </label>
                        <input type="date" name="fechadecompra" onChange={handleChange} required/>
                    <br/>

                        <label className="d-inline" htmlFor="moneda">Moneda </label>
                        <select name="moneda" required onChange={handleChange}>
                            <option value="mxn">MXN</option>
                            <option value="usd">USD</option>
                        </select>
                    </div>
                </div>{/* Termina Encabezado proveedor */}

                {/* Empieza proveedor */}
                <div className="row">
                    <div className="one-half column">
                        <SearchBar type="provider" key="1" />
                        
                    </div>

                    <div className="one-half column">
                        <SearchBar type="articles" key="2" />

                    </div>
                </div> {/* Termina proveedor */}

                <div className="row data">
                    <div className="one-half column">
                    {selectedProvider 
                        ?(
                            <div className="row">
                                <label htmlFor="provider">Empresa</label>
                                <input type="text" name="provider" className="u-full-width" value={selectedProvider.name} readOnly />
                                
                                <label htmlFor="address">Direccion</label>
                                <input type="text" name="address" className="u-full-width" value={selectedProvider.address} readOnly />
                                
                                <div className="row">
                                    <div className="one-half column">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" className="u-full-width" value={selectedProvider.email} readOnly />                                    
                                    </div>

                                    <div className="one-half column">
                                        <label htmlFor="phone">Telefono</label>
                                        <input type="text" name="phone" className="u-full-width" value={selectedProvider.phone} readOnly />
                                    </div>
                                </div>
                            </div>
                        )
                        :(
                            <div className="row">
                                <h3>Selecciona un proveedor</h3>
                                <p>En la barra de busqueda, comienza a escribir y da click en tu proveedor</p>
                            </div>
                        )}
                    </div>

                    <div className="one-half column">

                        <label htmlFor="employee">Empleado</label>
                        <input type="text" name="employee" className="u-full-width" value={user.name} readOnly />
                        
                        <label htmlFor="empresa">Empresa</label>
                        <input type="text" name="employee" className="u-full-width" value={'Tejidos Tecnicos Mallatex S.A. De C.V.'} readOnly />
                        
                        <label htmlFor="employee_address">Direccion</label>
                        <input type="text" name="employee_address" className="u-full-width" value={'Av. Iturbide #5210, Zapopan, Jal.'} readOnly />

                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" className="u-full-width" value={user.email} readOnly />   

                    </div>

                </div>

                {/* Empieza datos de envio */}
                <div className="row">
                    <div className="one-third column">
                        <label className="Orden__titulo u-full-width" htmlFor="enviado_mediante">Enviado mediante </label>
                        <input type="text" name="enviado_mediante" className="u-full-width" onChange={handleChange}/>
                    </div>
                    <div className="one-third column">
                        <label className="Orden__titulo u-full-width" htmlFor="fob">F.O.B</label>
                        <input type="text" name="fob" className="u-full-width" onChange={handleChange}/>
                    </div>
                    <div className="one-third column">
                        <label className="Orden__titulo u-full-width" htmlFor="empleado_envio">Empleado </label>
                        <input type="text" name="empleado_envio" className="u-full-width" onChange={handleChange}/>
                    </div>
                </div>{/* Termina datos de envio */}

                <div className="row">
                    <h2>Articulos Seleccionados</h2>
                    <ArticleList />
                </div>

                

            </form>
        </Layout>
    )
}

export default NewOrder