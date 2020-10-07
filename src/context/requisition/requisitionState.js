import React, { useReducer } from 'react'

import RequisitionsContext from './requisitionContext'
import RequisitionsReducer from './requisitionsReducer'
import AxiosClient from '../../config/Axios'

import {
    SELECT_ARTICLE,
    DELETE_SELECTED_ARTICLE,
    REQUISITION_ARTICLES,
    CREATE_REQUISITION,
    CREATE_ERROR,
    UPDATE_REQUISITION_ARTICLE,
    GET_REQUISITIONS,
    DELETE_REQUISITION,
    UPDATE_REQUISITION,
    GET_APROVED_REQUISITIONS
} from '../../types'


const RequisitionState = props => {
    
    const initialState = {
        requisitions:[],
        aprovedRequisitions:[],
        requisitionSelectedArticles:[],
        requisitionArticles:[],
        message:'',
    }

    //Dispatch to execute actions
    const [state,dispatch] = useReducer(RequisitionsReducer,initialState)

    //Funciones para el CRUD

    //Para los articulos seleccionados
    const selectRequisitionArticles = article =>{
        dispatch({
            type:SELECT_ARTICLE,
            payload:article,
        })
    }

    //Elimina uno de los articulos seleccionados
    const deleteRequisitionSelectedArticle = articleID =>{
        dispatch({
            type:DELETE_SELECTED_ARTICLE,
            payload:articleID
        })
    }

    //Para los articulos que van a estar dentro de la requisicion
    const setReqArticles = articles =>{
        dispatch({
            type:REQUISITION_ARTICLES,
            payload:articles
        })
    }

    const updateRequisitionArticle = article =>{
        dispatch({
            type:UPDATE_REQUISITION_ARTICLE,
            payload:article
        })
    }

    //Crear una requisicion
    const createRequisition = async data =>{
        try {
            const response = await AxiosClient.post('/api/requisitions/new',data)
            dispatch({
                type:CREATE_REQUISITION,
                payload:response.data
            })
        } catch (error) {
            let alert
            if(error.response){
                alert = {
                    msg:error.response.data.msg,
                    category:'alerta-error'
                }
            }
            else{
                alert = {
                    msg:error.message,
                    category:'alerta-error'
                }
            }

            dispatch({
                type:CREATE_ERROR,
                payload:alert
            })
        }
    }

    //Get requisitions
    const getRequisitions = async () =>{
        try {
            const response = await AxiosClient.get('/api/requisitions/')
            const requisitions = response.data.requisitions
            dispatch({
                type: GET_REQUISITIONS,
                payload: requisitions
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Get Aproved requisitions
    const getAprovedRequisitions = async () =>{
        try {
            const response = await AxiosClient.get('/api/requisitions/aproved')
            const aproved = response.data.requisitions
            console.log(aproved)
            dispatch({
                type: GET_APROVED_REQUISITIONS,
                payload: aproved
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Delete Requisitions
    const deleteRequisition = async (id) =>{
        try {
            const response = await AxiosClient.delete(`/api/requisitions/${id}`)
            dispatch({
                type: DELETE_REQUISITION,
                payload:id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Update Requisition
    const updateRequisition = async requisition =>{
        try {
            const response = await AxiosClient.put(`/api/requisitions/${requisition._id}`,requisition)
            dispatch({
                type: UPDATE_REQUISITION,
                payload:response.data
            })
        } catch (error) {
            dispatch({
                type: CREATE_ERROR,
                payload:{
                    msg:error.response.data.msg,
                    category:'alerta-error'
                }
            })
        }
    }

    return(
        <RequisitionsContext.Provider value ={{
            requisitions:state.requisitions,
            requisitionSelectedArticles:state.requisitionSelectedArticles,
            requisitionArticles:state.requisitionArticles,
            message:state.message,
            aprovedRequisitions:state.aprovedRequisitions,
            selectRequisitionArticles,
            deleteRequisitionSelectedArticle,
            setReqArticles,
            createRequisition,
            deleteRequisition,
            updateRequisition,
            updateRequisitionArticle,
            getRequisitions,
            getAprovedRequisitions
        }}>
            {props.children}
        </RequisitionsContext.Provider>
    )

}

export default RequisitionState