import React, { useContext, useEffect, useState } from 'react'
import RequisitionPDF from './Requisitionpdf'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
//Context
import RequisitionContext from '../../context/requisition/requisitionContext'
import AlertsContext from '../../context/alerts/alertsContext'
import AuthContext from '../../context/auth/authContext'


const Requisition = ({requisition}) =>{

    const requisitionContext = useContext(RequisitionContext)
    const { deleteRequisition, updateRequisition, message } = requisitionContext

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    const authContext = useContext(AuthContext)
    const { user } = authContext

    useEffect(() =>{
        if(message){
            const {msg,category} = message
            showAlert(msg,category)
        }
    },[message])

    const [ onReview, setOnReview ] = useState(false)
    const [ reviewedArticles, setReviewedArticles ] = useState([])

    const handleDeleteClick = id =>{
        if(user.level < 3){
            showAlert('No tienes autorizacion para realizar esta acción', 'alerta-error')
            return
        }
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
        if(req.state !== 'pendiente'){
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

    const handleQuantityReview = (e,article) =>{
        const alreadyAdded = reviewedArticles.filter( reviewed => reviewed._id === article._id)
        console.log(alreadyAdded)

        if(alreadyAdded.length < 1){
            setReviewedArticles([
                    ...reviewedArticles,
                    article
                ]
            )
        }

        else{
            setReviewedArticles(
                reviewedArticles.map( reviewed =>{
                        if(reviewed._id === article._id){
                            reviewed.quantity = e.target.value
                        }

                        return reviewed
                    })       
            )
        }
        
    }

    const handleReviewed = e =>{

    }

    const handleReviewClick = req => {

        if (user.level < 2 ){
            showAlert('No tienes autorizacion para realizar esta acción', 'alerta-error')
            return
        }

        if(req.reviewed){
            showAlert('La requisición ya ha sido revisada', 'alerta-error')
            return
        }

        setOnReview(true)
    }

    const handleCancelReviewed = e =>{
        setOnReview(false)
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
        <li className="tarea sombra Requisition" key={requisition.folio}>
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
                    
                </div>

                <div className="one-half column">
                    <div className="row">
                        <h4>Fecha: <span className="fw-400">{fecha}</span></h4>
                        <h4>Comentarios: <span className="fw-400">{requisition.comments}</span></h4>
                    </div>
                    <div className="row">
                        <button type="button" className="button button-primary" onClick={() => handleShowClick(requisition.articles)}>Ver Articulos</button>
                    </div>
                </div>
            </div>
            
            {onReview 
                ?(
                    <div className="row Review__active">
                        <h2>Revisar Requisición</h2>
                        <form>
                            <table>
                                <thead className="table100-head">
                                    <tr>
                                        <th>Descripcion</th>
                                        <th>Cantidad</th>
                                        <th>Pedir</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {requisition.articles.map( article =>(
                                        <tr key={article.article._id}>
                                            <td className="column1rev">{article.article.description}</td>
                                            <td className="column2rev">{article.quantity}</td>
                                            <td className="column3rev">
                                                <input 
                                                    type="number" 
                                                    required 
                                                    onChange={e => handleQuantityReview(e,article)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button type="button" onClick={handleCancelReviewed} className="button button-primary">Cancelar</button>

                            <button
                                type="submit"
                                className="button button-blue"
                                onClick={ () => handleReviewed() }
                                >
                                Marcar como Revisada
                            </button>

                        </form>
                    </div>
                ) 
                : null}

        </li>
    )
}

export default Requisition