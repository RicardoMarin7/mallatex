import React, { useContext } from 'react'
import OrdersContext from '../../context/orders/ordersContext'
import RequisitionContext from '../../context/requisition/requisitionContext'
import { useEffect } from 'react'

const ArticleList = ({quantity, context}) =>{

    const ordersContext = useContext(OrdersContext)
    const { selectedArticles, deleteSelectedArticle} = ordersContext

    const requisitionContext = useContext(RequisitionContext)
    const { requisitionSelectedArticles,  deleteRequisitionSelectedArticle } = requisitionContext

    let articles = []
    if(context === 'requisition'){
        if(requisitionSelectedArticles.length === 0){
            return <p>No hay articulos seleccionados</p>
        }

        articles = requisitionSelectedArticles

    }

    else{
        if(selectedArticles.length === 0){
            return <p>No hay articulos seleccionados</p>
        }
        articles = selectedArticles
    }
    

    const handleClick = e =>{
        if(context === 'requisition'){
            deleteRequisitionSelectedArticle(e.target.getAttribute('data-key'))
        }
        else{
            deleteSelectedArticle(e.target.getAttribute('data-key'))
        }
        
    }

    const handleChange = e =>{
        e.target.getAttribute('data-key')
    }

    return(
        <table>
            <thead className="table100-head">
                <tr>
                    <th>Codigo</th>
                    <th>Descripcion</th>
                    <th>Unidad</th>
                    <th>Linea</th>
                    {quantity ? (<th>Cantidad</th>) : null}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { articles.map( article => (
                    <tr key={article._id}>
                        <td className="column1">{article.code}</td>
                        <td className="column2">{article.description}</td>
                        <td className="column3">{article.unit}</td>
                        <td className="column4">{article.line}</td>
                        {quantity 
                        ?(
                            <td className="column5"><input className="quantity" type="number" name="quantity" onChange={handleChange} required data-key={article._id}/></td>
                        ): null }
                        <td className="column6"><button className="DeleteButton" type="button" onClick={handleClick} data-key={article._id}>Eliminar</button></td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ArticleList