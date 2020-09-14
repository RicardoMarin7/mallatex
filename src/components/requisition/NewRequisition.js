import React, { useContext, useEffect, useState } from 'react'

import Layout from '../layout/Layout'
import SearchBar from '../utility/SearchBar'
import ArticleList from '../utility/ArticleList'

import AuthContext from '../../context/auth/authContext'
import OrdersContext from '../../context/orders/ordersContext'
import RequisitionContext from '../../context/requisition/requisitionContext'
import AlertsContext from '../../context/alerts/alertsContext'

const NewRequisition = () =>{

    const today = e =>{
        let fecha = new Date()
        let dia = String(fecha.getDate()).padStart(2,'0')
        let mes = String(fecha.getMonth() + 1).padStart(2,'0')
        let anho = fecha.getFullYear()

        return fecha = `${anho}-${mes}-${dia}`
    }

    //Context

    const authContext = useContext(AuthContext)
    const { user } = authContext

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    const ordersContext = useContext(OrdersContext)
    const { getArticles, articles} = ordersContext

    const requisitionContext = useContext(RequisitionContext)
    const { requisitionArticles,createRequisition, message } = requisitionContext

    //State local
    const [requisition,setRequisition] = useState({
        comments:'',
        articles:[]
    })

    const {comments} = requisition

    useEffect( () =>{
        if(articles.length < 1){
            getArticles()
        }

        if(message){
            const {msg,category} = message
            showAlert(msg,category)
        }

        setRequisition({
            ...requisition,
            articles:requisitionArticles
        })
    },[requisitionArticles,message])

    const handleSubmit = e =>{
        e.preventDefault()
        if(requisitionArticles.length < 1){
            showAlert('Debes seleccionar por lo menos un articulo','alerta-error')
            return
        }

        for(let i = 0; i < requisitionArticles.length ; i++){
            const articleQuantity = requisitionArticles[i].quantity
            if(articleQuantity === '' || articleQuantity < 1){
                showAlert('La cantidad en todos los articulos debe ser mayor que 0','alerta-error')
                return
            }
            
        }
        
        setRequisition({
            comments:'',
            articles:[],
            sendTo:'',
            client:''
        })
        createRequisition(requisition)
    }

    const handleChange = e =>{
        setRequisition({
            ...requisition,
            [e.target.name]:e.target.value
        })
    }

    return(
        <Layout>
            {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div>: null}

            <h1>Nueva Requisición</h1>
            <form onSubmit={handleSubmit}>

                <div className="row">
                    <SearchBar type="articles" context="requisition"/>
                </div>

                <div className="row data">

                    <div className="one-half column">
                        <div className="row">

                            <div className="one-half column">
                                <label className="" htmlFor="folio">Folio </label>
                                <input type="number" name="folio" value="1" readOnly/>

                                
                            </div>

                            <div className="one-half column">
                                <label className="" htmlFor="fecha">Fecha </label>
                                <input type="date" name="fecha" value={today()} readOnly/>
                            </div>

                            <label htmlFor="comments">Comentarios</label>
                            <textarea name="comments" className="u-full-width" value={comments} onChange={handleChange} placeholder="Escribe aqui tus comentarios"></textarea>
                            
                        </div>

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

                <div className="row">
                    <h2>Articulos Seleccionados</h2>
                    <ArticleList quantity={true} context='requisition'/>
                </div>

                <button className="button button-primary">Crear Requisición</button>

            </form>
        </Layout>
    )
}

export default NewRequisition