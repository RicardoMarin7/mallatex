import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Order = ({order}) =>{

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles.map( article =>(
                                        <tr key={article.article._id}>
                                            <td className="column1rev">{article.article.description}</td>
                                            <td className="column2rev">{article.quantity}</td>
                                        </tr>
                                    ))}

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
                        </div>
                    </div>

                    <div className="row">
                        <div className="one-half column">
                            {/* <button type="button" className="button button-primary" onClick={ () => orderPDF(order)}>Generar PDF</button> */}
                        </div>

                        <div className="one-half column">
                            <button type="button" className="button button-delete" onClick={() => alert('delete')}>Eliminar</button>
                        </div>
                    </div>
                    
                </div>

                <div className="one-half column">
                    <div className="row">
                        {/* <h4>Fecha: <span className="fw-400">{fecha}</span></h4> */}
                        <h4>Comentarios: <span className="fw-400">{order.comments}</span></h4>
                    </div>
                    <div className="row">
                        <button type="button" className="button button-primary" onClick={() => handleShowClick(order.articles)}>Ver Articulos</button>
                    </div>
                </div>
            </div>
            
        </li>
    )
}

export default Order