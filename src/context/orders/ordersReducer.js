import { 
    GET_ORDERS,
    CREATE_ORDER,
    DELETE_ORDER,
    GET_PROVIDERS,
    GET_ARTICLES,
    SELECT_ARTICLE,
    DELETE_SELECTED_ARTICLE,
    SELECT_PROVIDER,
    SELECT_REQUISITION
} from '../../types'

export default (state,action) =>{

    switch(action.type){

        case GET_ORDERS:
            return{
                ...state,
                orders: action.payload
            }

        case CREATE_ORDER:
            return{
                ...state,
                selectedProvider:[],
                selectedRequisition:[],
                message:{
                    msg: 'Orden creada con éxito',
                    category:'alerta-ok'
                }
            }
            
        case DELETE_ORDER:
            return{
                ...state,
                order: state.orders.filter( order => order._id !== action.payload),
            }

        case GET_PROVIDERS:
            return{
                ...state,
                providers: action.payload
            }

        case GET_ARTICLES:
            return{
                ...state,
                articles: action.payload
            }

        case SELECT_ARTICLE:
            return{
                ...state,
                selectedArticles:[...state.selectedArticles, action.payload],
            }

        case DELETE_SELECTED_ARTICLE:
            return{
                ...state,
                selectedArticles:state.selectedArticles.filter( article => article._id !== action.payload )
            }
        
        case SELECT_PROVIDER:
            return{
                ...state,
                selectedProvider:action.payload
            }

        case SELECT_REQUISITION:
            return{
                ...state,
                selectedRequisition:action.payload
            }

        default:
            return state;
    }
}