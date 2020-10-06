import React, { useState, useContext, useEffect } from 'react'

//Components
import Layout from '../layout/Layout'
import SearchBar from '../utility/SearchBar'

//Context
import AuthContext from '../../context/auth/authContext'
import OrdersContext from '../../context/orders/ordersContext'
import SelectRequisition from './SelectRequisition'

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
    const { getProviders, selectedProvider, selectedRequisition, selectRequisition, providers} = ordersContext


    const [order,setOrder] = useState({
        boughtdate:'',
        currency:'mxn',
        provider:'',
        createdby:'',
        sentvia:'',
        fob:'',
        sendemployee:'',
        subtotal:0,
        total:0,
        iva:0,
        shipping_cost:0,
        other_spending:0
    })

    const {total,subtotal,iva, currency, fob,sendemployee, sentvia, other_spending, shipping_cost} = order
    

    useEffect( () =>{
        if(providers.length === 0){
            getProviders()
        }
        
        setOrder({
            ...order,
            total: subtotal + iva + other_spending + shipping_cost
          })
    },[other_spending, shipping_cost])


 

    if(selectedRequisition.length === 0){
        return(
            <Layout>
                <SelectRequisition

                />
            </Layout>
        )
    }

    

    const {reviewedArticles} = selectedRequisition


    const handleChange = e =>{
        setOrder({
            ...order,
            [e.target.name]:e.target.value
        })
    }

    const handlePriceChange = (e,article) =>{
        const newReviewed = reviewedArticles.map( art =>{
            if(art._id === article._id){
                art.price = e.target.value
                art.import = e.target.value * art.quantity
            }
            return art
        })


        let newSubTotal = 0
        reviewedArticles.forEach( art => {
            if(art.import) newSubTotal += art.import
        })
        
        const newIva = newSubTotal * 0.16
        const newTotal = newIva + newSubTotal

        setOrder({
            ...order,
            subtotal: newSubTotal,
            iva: newIva,
            total: newTotal
        })

        selectRequisition({
                ...selectedRequisition,
                reviewedArticles: newReviewed
            }
        )
    }

    const handleTotalModifierChange = e =>{
        const {name,value} = e.target

        if(value === ''){
            setOrder({
                ...order,
                [name] : 0
            })
            return
        }

        setOrder({
            ...order,
            [name] : parseFloat(value)
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

                        <label className="d-inline" htmlFor="boughtdate">Fecha de Compra </label>
                        <input type="date" name="boughtdate" onChange={handleChange} required/>
                    <br/>

                        <label className="d-inline" htmlFor="currency">Moneda </label>
                        <select name="currency" value={currency} required onChange={handleChange}>
                            <option value="mxn">MXN</option>
                            <option value="usd">USD</option>
                        </select>
                    </div>
                </div>{/* Termina Encabezado proveedor */}

                {/* Empieza proveedor */}
                <div className="row">
                        <SearchBar type="provider" key="1" />
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
                        <label className="Orden__titulo u-full-width" htmlFor="sentvia">Enviado mediante </label>
                        <input type="text" name="sentvia" className="u-full-width" value={sentvia} onChange={handleChange}/>
                    </div>
                    <div className="one-third column">
                        <label className="Orden__titulo u-full-width" htmlFor="fob">F.O.B</label>
                        <input type="text" name="fob" className="u-full-width" value={fob} onChange={handleChange}/>
                    </div>
                    <div className="one-third column">
                        <label className="Orden__titulo u-full-width" htmlFor="sendemployee">Empleado </label>
                        <input type="text" name="sendemployee" className="u-full-width" value={sendemployee} onChange={handleChange}/>
                    </div>
                </div>{/* Termina datos de envio */}

                <div className="row">
                    <h2>Articulos en Requisición</h2>
                    <table>
                        <thead className="table100-head">
                            <tr>
                                <th>Descripcion</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviewedArticles.map( article =>(
                                <tr key={article.article._id}>
                                    <td className="column1ord">{article.article.description}</td>
                                    <td className="column2ord">{article.quantity}</td>
                                    <td className="column3ord">
                                        <input type="number" onChange={ e => handlePriceChange(e,article)} required/>
                                    </td>
                                    {article.price 
                                    ?(<td 
                                        className="column4ord">
                                            {`$${new Intl.NumberFormat("en-US").format(article.import = article.quantity * article.price)}`}
                                    </td>) 
                                    :(<td className="column4ord">$0</td>) }
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td className="txt-right"><span className="fw-700">Envío</span></td>
                                <td>
                                    <input type="number" onChange={handleTotalModifierChange} name="shipping_cost" />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td className="txt-right"><span className="fw-700">Otro</span></td>
                                <td>
                                    <input type="number" onChange={handleTotalModifierChange} name="other_spending"/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <span className="fw-700">SubTotal:</span> {`$${new Intl.NumberFormat("en-US").format(subtotal)}`} <br/>
                                    <span className="fw-700">IVA:</span> {`$${new Intl.NumberFormat("en-US").format(iva)}`} <br/>
                                    <span className="fw-700">Total:</span> {`$${new Intl.NumberFormat("en-US").format(total)}`} <br/>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className="formulas">
                </div>

                <button>Crear Orden</button>

            </form>
        </Layout>
    )
}

export default NewOrder