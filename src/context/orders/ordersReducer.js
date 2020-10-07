import { 
    FORM_ORDER,
    GET_ORDERS,
    CREATE_ORDER,
    VALIDATE_FORM,
    ACTUAL_ORDER,
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
            
        case ACTUAL_ORDER:
            return{
                ...state,
                project: state.projects.filter( project => project.id === action.payload)
            }   
        
        case DELETE_ORDER:
            return{
                ...state,
                projects: state.projects.filter( project => project.id !== action.payload),
                project: null
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