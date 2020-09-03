import React, { useState, useContext, useEffect } from 'react'

import Layout from '../layout/Layout'
import SearchBar from '../utility/SearchBar'
import ArticleList from '../utility/ArticleList'

import AuthContext from '../../context/auth/authContext'
import OrdersContext from '../../context/orders/ordersContext'
import RequisitionContext from '../../context/requisition/requisitionContext'

const NewRequisition = () =>{

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
    const { getArticles } = ordersContext

    const requisitionContext = useContext(RequisitionContext)
    const {  } = requisitionContext

    useEffect( () =>{
        getArticles()
    },[])

    const handleSubmit = e =>{
        e.preventDefault()
    }

    return(
        <Layout>

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

                            <label htmlFor="comentarios">Comentarios</label>
                            <textarea name="comentarios" className="u-full-width" id=""></textarea>
                            
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
                    <ArticleList quantity={true} context='requisition' />
                </div>

                <button>Enviar</button>

            </form>
        </Layout>
    )
}

export default NewRequisition