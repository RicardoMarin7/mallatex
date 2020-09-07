import { 
    SELECT_ARTICLE,
    GET_ARTICLES,
    DELETE_SELECTED_ARTICLE,
    REQUISITION_ARTICLES,
    CREATE_ERROR,
    CREATE_REQUISITION

} from '../../types'

export default (state,action) =>{

    switch(action.type){
        case GET_ARTICLES:
            return{
                ...state,
                articles: action.payload
            }

        case SELECT_ARTICLE:
            return{
                ...state,
                requisitionSelectedArticles:[...state.requisitionSelectedArticles, action.payload],
            }

        case REQUISITION_ARTICLES:
            return{
                ...state,
                requisitionArticles: action.payload,
            }

        case DELETE_SELECTED_ARTICLE:
            return{
                ...state,
                requisitionSelectedArticles:state.requisitionSelectedArticles.filter( article => article._id !== action.payload )
            }

        case CREATE_REQUISITION:
            return{
                ...state,
                requisitionArticles:[],
                requisitionSelectedArticles:[],
                message:{
                    msg: action.payload.msg,
                    category:'alerta-ok'
                },
                created:true
            }
        
        case CREATE_ERROR:
            return{
                ...state,
                message:action.payload,
            }
    

        default:
            return state;
    }
}