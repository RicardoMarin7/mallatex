import React, {useContext} from 'react'
import RequisitionPDF from './Requisitionpdf'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import RequisitionContext from '../../context/requisition/requisitionContext'



const Requisition = ({requisition}) =>{

    const requisitionContext = useContext(RequisitionContext)
    const { deleteRequisition } = requisitionContext

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