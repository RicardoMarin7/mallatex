import React, { useReducer } from 'react'

import OrdersContext from './ordersContext'
import OrdersReducer from './ordersReducer'
import AxiosClient from '../../config/Axios'

import { 
    GET_ORDERS,
    CREATE_ORDER,
    CREATE_ERROR,
    DELETE_ORDER,
    GET_PROVIDERS,
    GET_ARTICLES,
    SELECT_ARTICLE,
    DELETE_SELECTED_ARTICLE,
    SELECT_PROVIDER, SELECT_REQUISITION
} from '../../types'


const OrdersState = props => {
    
    const initialState = {
        orders:[],
        providers:[],
        articles:[],
        selectedArticles:[],
        selectedProvider:'',
        selectedRequisition:[],
        message:''
    }

    //Dispatch to execute actions
    const [state,dispatch] = useReducer(OrdersReducer,initialState)

    //Funciones para el CRUD

    //Obtiene Todos los Articulos
    const getArticles = async () =>{
        try {
            const response = await AxiosClient.get('/api/articles/')
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

    //Elimina uno de los articulos seleccionados
    const deleteSelectedArticle = articleID =>{
        dispatch({
            type:DELETE_SELECTED_ARTICLE,
            payload:articleID
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

     //Selecccionar un proveedor
    const selectProvider = provider =>{
        dispatch({
            type:SELECT_PROVIDER,
            payload:provider,
        })
    }

    //Selecciona una requisición a convertir
    const selectRequisition = requisition =>{
        dispatch({
            type:SELECT_REQUISITION,
            payload:requisition
        })
    }

    //Obtiene todos los proyectos
    const getOrders = async () =>{
        try {
            const response = await AxiosClient.get('/api/orders/')
            const orders = response.data.orders
            dispatch({
                type: GET_ORDERS,
                payload: orders
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Create Order
    const createOrder = async (data) =>{
        try {
            const response = await AxiosClient.post('/api/orders/new',data)
            dispatch({
                type:CREATE_ORDER,
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

    //Delete project
    const deleteOrder = async id =>{
        try {
            const response = await AxiosClient.delete(`/api/orders/${id}`)
            console.log(response)
            dispatch({
                type: DELETE_ORDER,
                payload:id
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <OrdersContext.Provider value ={{
            providers:state.providers,
            articles:state.articles,
            selectedArticles:state.selectedArticles,
            selectedProvider:state.selectedProvider,
            selectedRequisition:state.selectedRequisition,
            orders:state.orders,
            selectRequisition,
            selectArticles,
            getArticles,
            getProviders,
            deleteSelectedArticle,
            selectProvider,
            createOrder,
            getOrders,
            deleteOrder

        }}>
            {props.children}
        </OrdersContext.Provider>
    )

}

export default OrdersState