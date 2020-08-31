import React, { useReducer } from 'react'

import OrdersContext from './ordersContext'
import OrdersReducer from './ordersReducer'
import AxiosClient from '../../config/Axios'

import { 
    FORM_ORDER,
    GET_ORDERS,
    ADD_ORDER,
    VALIDATE_FORM,
    ACTUAL_ORDER,
    DELETE_ORDER,
    GET_PROVIDERS,
    GET_ARTICLES,
    SELECT_ARTICLE
} from '../../types'


const OrdersState = props => {
    
    const initialState = {
        projects:[],
        formNewProject : false,
        errorForm : false,
        project : null,
        providers:[],
        articles:[],
        selectedArticles:[],
        selectedProvider:'',
        message:''
    }

    //Dispatch to execute actions
    const [state,dispatch] = useReducer(OrdersReducer,initialState)

    //Funciones para el CRUD

    //Obtiene Todos los Articulos
    const getArticles = async () =>{
        try {
            const response = await AxiosClient.get('/api/articles/')
            console.log(response.data.articles)
            const articles = response.data.articles

            dispatch({
                type: GET_ARTICLES,
                payload: articles
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Para los articulos seleccionados
    const selectArticles = article =>{
        dispatch({
            type:SELECT_ARTICLE,
            payload:article,
        })
    }

    //Obtiene todos los proveedores
    const getProviders = async () =>{
        try {
            const response = await AxiosClient.get('/api/providers/')
            console.log(response)
            const providers = response.data.provider
            dispatch({
                type: GET_PROVIDERS,
                payload:providers
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Obtiene todos los proyectos
    const getProjects = () =>{
        dispatch({
            type:GET_ORDERS,
            //payload: projects
        })
    }

    //Add project to state
    const addOrder = async (Order) =>{
        try {
            const response = await AxiosClient.post('/api/orders/new', Order)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    //Selecciona el proyecto que el usuario le dio click
    const actualProject = projectID =>{
        dispatch({
            type:ACTUAL_ORDER,
            payload: projectID
        })
    }

    //Delete project
    const deleteProject = projectID =>{
        dispatch({
            type:DELETE_ORDER,
            payload: projectID
        })
    }

    return(
        <OrdersContext.Provider value ={{
            providers:state.providers,
            articles:state.articles,
            selectedArticles:state.selectedArticles,
            selectArticles,
            getArticles,
            getProviders

        }}>
            {props.children}
        </OrdersContext.Provider>
    )

}

export default OrdersState