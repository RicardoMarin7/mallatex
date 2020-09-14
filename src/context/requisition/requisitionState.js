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
    GET_REQUISITIONS
} from '../../types'


const RequisitionState = props => {
    
    const initialState = {
        requisitions:[],
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

    return(
        <RequisitionsContext.Provider value ={{
            requisitions:state.requisitions,
            requisitionSelectedArticles:state.requisitionSelectedArticles,
            requisitionArticles:state.requisitionArticles,
            message:state.message,
            selectRequisitionArticles,
            deleteRequisitionSelectedArticle,
            setReqArticles,
            createRequisition,
            updateRequisitionArticle,
            getRequisitions
        }}>
            {props.children}
        </RequisitionsContext.Provider>
    )

}

export default RequisitionState