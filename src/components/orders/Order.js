import React, {useContext} from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import OrderPDF from './OrderPDF'

//Context
import AlertsContext from '../../context/alerts/alertsContext'
import AuthContext from '../../context/auth/authContext'
import OrdersContext from '../../context/orders/ordersContext'

const Order = ({order}) =>{

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    const authContext = useContext(AuthContext)
    const { user } = authContext

    const ordersContext = useContext(OrdersContext)
    const { deleteOrder } = ordersContext

    let boughtDate = new Date(order.boughtdate)
    const FechaDeCompra = boughtDate.toLocaleDateString()

    let creationDate = new Date(order.creationdate)
    const FechaDeCreacion = creationDate.toLocaleDateString()

    const handleShowClick = articles =>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='Modal__review sombra'>
                        <h1>Articulos</h1>
                        <p>Articulos dentro de la orden</p>

                        <div className="row mb-5">
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
                                    {articles.map( article =>(
                                        <tr key={article.article._id}>
                                            <td className="column1ord">{article.article.description}</td>
                                            <td className="column2ord">{article.quantity}</td>
                                            <td className="column3ord">{article.price}</td>
                                            <td className="column4ord">{article.import}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <span className="fw-700">SubTotal:</span> {`$${new Intl.NumberFormat("en-US").format(order.subtotal)}`} <br/>
                                            <span className="fw-700">IVA:</span> {`$${new Intl.NumberFormat("en-US").format(order.iva)}`} <br/>
                                            <span className="fw-700">Total:</span> {`$${new Intl.NumberFormat("en-US").format(order.total)}`} <br/>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="row">
                                <button onClick={onClose} className="button button-primary">Cerrar</button>
                        </div>
                        
                        
                    </div>
                );
            }
        })
    }

    const handleDeleteClick = id =>{
        if(user.level < 3){
            showAlert('No tienes autorizacion para realizar esta acción', 'alerta-error')
            return
        }
        
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='Modal__question sombra'>
                        <h1 className="mrg-top-1rem">Eliminar Orden</h1>
                        <p>{`¿Desea eliminar la orden con folio: ${order.folio}?`}</p>

                        <div className="row">
                                <button 
                                    onClick={onClose} 
                                    className="button button-primary">
                                        Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="button button-delete"
                                    onClick={()=>{
                                        deleteOrder(id)
                                        onClose()
                                    }}
                                    >
                                    Eliminar
                                </button>
                        </div>
                    </div>
                );
            }
        })
        
    }

    return(
        <li className="tarea sombra Requisition" key={order.folio}>
            {/* {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null} */}
            
            <div className="row">
                
                <div className="one-half column">
                    <div className="row">
                        <div className="one-half column">
                            <h4>Folio <span className="fw-400">{order.folio}</span></h4>
                            <h4>Creada por <span className="fw-400">{order.createdby.name}</span></h4>
                            <h4>Proveedor <span className="fw-400">{order.provider.name}</span></h4>
                        </div>

                        <div className="one-half column">
                            <h4>Requerida por <span className="fw-400">{order.requestedby.name}</span></h4>
                            <h4>Folio de requisicion <span className="fw-400">{order.requisitionFolio}</span></h4>
                            <h4>Fecha de creación <span className="fw-400">{FechaDeCreacion}</span></h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="one-half column">
                            <button type="button" className="button button-primary" onClick={ () => OrderPDF(order)}>Generar PDF</button>
                        </div>

                        <div className="one-half column">
                            <button type="button" className="button button-delete" onClick={() => handleDeleteClick(order._id)}>Eliminar</button>
                        </div>
                    </div>
                    
                </div>

                <div className="one-half column">
                    <div className="row">
                        <h4>Fecha de compra <span className="fw-400">{FechaDeCompra}</span></h4>
                        <label htmlFor="comments">Comentarios</label>
                        <textarea name="comments" value={order.comments} readOnly/>
                    </div>
                    <div className="row">
                        <button type="button" className="button button-primary" onClick={() => handleShowClick(order.articles)}>Ver informacion</button>
                    </div>
                </div>
            </div>
            
        </li>
    )
}

export default Order