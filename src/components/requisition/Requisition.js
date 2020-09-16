import React, { useContext, useEffect } from 'react'
import RequisitionPDF from './Requisitionpdf'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
//Context
import RequisitionContext from '../../context/requisition/requisitionContext'
import AlertsContext from '../../context/alerts/alertsContext'


const Requisition = ({requisition}) =>{

    const requisitionContext = useContext(RequisitionContext)
    const { deleteRequisition, updateRequisition, message } = requisitionContext

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    useEffect(() =>{
        if(message){
            const {msg,category} = message
            showAlert(msg,category)
        }

    },[message])

    const handleDeleteClick = id =>{
        confirmAlert({
            title:'Eliminar Requisición',
            message:'Esta seguro que desea eliminarla?',
            buttons:[
                {
                    label:'Eliminar',
                    onClick:() => deleteRequisition(id)
                },
                {
                    label:'Cancelar'
                }
            ]
        })
    }

    const handleStateClick = (req) =>{
        if(req.state !== 'pending'){
            showAlert('La requisición ya ha sido actualizada','alerta-error')
            return
        } 

        const reqAproved = {
            ...req,
            state:'aprobada',
            folio:''
        }

        const reqRejected = {
            ...req,
            state:'rechazada',
            folio:''
        }
        
        confirmAlert({
            title:'Aprobar o Rechazar Requisición',
            message:'',
            buttons:[
                {
                    label:'Aprobar',
                    onClick:() => updateRequisition(reqAproved)
                },
                {
                    label:'Rechazar',
                    onClick: () => updateRequisition(reqRejected)
                }
            ]
        })
    }

    const handleReviewClick = req => {
        if(req.reviewed){
            showAlert('La requisición ya ha sido revisada', 'alerta-error')
            return
        }

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='Modal__review'>
                        <h1>Revisar Requisición</h1>
                        <p>Marque con una casilla los articulos que existan en almacén</p>

                        <div className="row">
                            <table>
                                <thead className="table100-head">
                                    <tr>
                                        <th>Descripcion</th>
                                        <th>Cantidad</th>
                                        <th>En almacén</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {req.articles.map( article =>(
                                        <tr key={article.article._id}>
                                            <td className="column1rev">{article.article.description}</td>
                                            <td className="column2rev">{article.quantity}</td>
                                            <td className="column3rev">
                                                <input type="checkbox"/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="row">
                            <div className="one-half column">
                                <button onClick={onClose} className="button button-primary">Cancelar</button>
                            </div>
                            <div className="one-half column">
                                <button
                                    onClick={() => {
                                        console.log('revisada')
                                    onClose();
                                    }}
                                    >
                                    Marcar como Revisada
                                </button>
                            </div>
                        </div>
                        
                        
                    </div>
                );
            }
        })

    }

    const stateClass = requisition.state
    const reviewedClass = requisition.reviewed
    let reviewed = 'Sin Revisar'
    if(reviewedClass){
        reviewed = 'Revisada'
    }

    let date = new Date(requisition.creationdate)
    const fecha = date.toLocaleDateString()

    return(
        <li className="tarea sombra" key={requisition.folio}>
            {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null}
            
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
                            <button className={`mb-5 u-full-width ${stateClass}`} onClick={() => handleStateClick(requisition)}>{requisition.state}</button>
                        </div>
                        <div className="one-half column">
                            <button className={`mb-5 u-full-width ${reviewedClass}`} onClick={() => handleReviewClick(requisition)}>{reviewed}</button>
                        </div>
                        
                    </div>

                    <div className="row">
                        <div className="one-half column">
                            <button type="button" className="button button-primary" onClick={ () => RequisitionPDF(requisition)}>Generar PDF</button>
                        </div>

                        <div className="one-half column">
                            <button type="button" className="button button-delete" onClick={() => handleDeleteClick(requisition._id)}>Eliminar</button>
                        </div>
                    </div>
                    
                    <h4>Comentarios: <span>{requisition.comments}</span></h4>
                </div>
                <div className="one-half column">
                    <table>
                        <thead className="table100-head">
                            <tr>
                                <th>Descripcion</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requisition.articles.map( article =>(
                                <tr key={article.article._id}>
                                    <td className="column1req">{article.article.description}</td>
                                    <td className="column2req">{article.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    )
}

export default Requisition