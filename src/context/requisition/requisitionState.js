import React, { useReducer } from 'react'

import RequisitionsContext from './requisitionContext'
import RequisitionsReducer from './requisitionsReducer'
import AxiosClient from '../../config/Axios'

import {
    SELECT_ARTICLE,
    DELETE_SELECTED_ARTICLE
} from '../../types'


const RequisitionState = props => {
    
    const initialState = {
        requisitions:[],
        requisitionSelectedArticles:[],
        message:''
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

    return(
        <RequisitionsContext.Provider value ={{
            requisitionSelectedArticles:state.requisitionSelectedArticles,
            selectRequisitionArticles,
            deleteRequisitionSelectedArticle,
        }}>
            {props.children}
        </RequisitionsContext.Provider>
    )

}

export default RequisitionState