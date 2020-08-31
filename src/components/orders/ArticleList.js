import React, { useContext } from 'react'
import OrdersContext from '../../context/orders/ordersContext'
import { useEffect } from 'react'

const ArticleList = () =>{

    const ordersContext = useContext(OrdersContext)
    const { selectedArticles, deleteSelectedArticle} = ordersContext

    if(selectedArticles.length === 0){
        return <p>No hay articulos seleccionados</p>
    }

    const handleClick = e =>{
        deleteSelectedArticle(e.target.getAttribute('data-key'))
    }

    return(
        <table>
            <thead className="table100-head">
                <tr>
                    <th>Codigo</th>
                    <th>Descripcion</th>
                    <th>Unidad</th>
                    <th>Linea</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { selectedArticles.map( article => (
                    <tr key={article._id}>
                        <td className="column1">{article.code}</td>
                        <td className="column2">{article.description}</td>
                        <td className="column3">{article.unit}</td>
                        <td className="column4">{article.line}</td>
                        <td className="column5"><button className="DeleteButton" type="button" onClick={handleClick} data-key={article._id}>Eliminar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ArticleList