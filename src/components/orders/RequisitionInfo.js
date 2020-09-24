import React, { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import OrdersContext from '../../context/orders/ordersContext'


const RequisitionInfo = ({requisition}) =>{

    const ordersContext = useContext(OrdersContext)
    const { selectRequisition } = ordersContext

    const stateClass = requisition.state
    const reviewedClass = requisition.reviewed
    let reviewed = 'Sin Revisar'
    if(reviewedClass){
        reviewed = 'Revisada'
    }

    let date = new Date(requisition.creationdate)
    const fecha = date.toLocaleDateString()

    const handleShowClick = articles =>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='Modal__review sombra'>
                        <h1>Articulos</h1>
                        <p>Articulos dentro de la requisición</p>

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
        <li className="tarea sombra Requisition" key={requisition.folio}>
            {/* {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null} */}
            
            <div className="row">
                
                <div className="one-half column">
                    <div className="row">
                        <div className="one-half column">
                            <h4>Folio: <span className="fw-400">{requisition.folio}</span></h4>
                            <h4>Creada por: <span className="fw-400">{requisition.createdby.name}</span></h4>
                        </div>

                        <div className="one-half column">
                            <h4>Enviar a: <span className="fw-400">{requisition.sendTo}</span></h4>
                            <h4>Cliente: <span className="fw-400">{requisition.client}</span></h4>
                        </div>
                    </div>
                    
                    <div className="estado row">
                        <div className="one-half column">
                            <button className={`mb-5 u-full-width ${stateClass}`}>{requisition.state}</button>
                        </div>
                        <div className="one-half column">
                            <button className={`mb-5 u-full-width ${reviewedClass}`}>{reviewed}</button>
                        </div>
                    </div>

                    
                </div>

                <div className="one-half column">
                    <div className="row">
                        <h4>Fecha: <span className="fw-400">{fecha}</span></h4>
                        <h4>Comentarios: <span className="fw-400">{requisition.comments}</span></h4>
                    </div>
                    <div className="row">
                        <button 
                            type="button" 
                            className="button button-primary" 
                            onClick={() => handleShowClick(requisition.reviewedArticles)}>Ver Articulos Revisados</button>

                        <button 
                            type="button" 
                            className="button button-primary" 
                            onClick={() => selectRequisition(requisition)}>Convertir a Orden</button>
                    </div>
                </div>
            </div>

        </li>
    )
}

export default RequisitionInfo