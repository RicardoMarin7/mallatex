import { 
    SELECT_ARTICLE,
    GET_ARTICLES,
    DELETE_SELECTED_ARTICLE,
    REQUISITION_ARTICLES,
    CREATE_ERROR,
    CREATE_REQUISITION,
    UPDATE_REQUISITION_ARTICLE, 
    GET_REQUISITIONS,
    DELETE_REQUISITION, UPDATE_REQUISITION, GET_APROVED_REQUISITIONS

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
                message:{
                    msg: 'Artículo añadido con éxito',
                    category:'alerta-ok'
                }
            }

        case REQUISITION_ARTICLES:
            return{
                ...state,
                requisitionArticles: [...state.requisitionArticles , action.payload]
            }

        case DELETE_SELECTED_ARTICLE:
            return{
                ...state,
                requisitionSelectedArticles:state.requisitionSelectedArticles.filter( article => article._id !== action.payload ),
                requisitionArticles:state.requisitionArticles.filter( article => article.article !== action.payload )
            }

        case UPDATE_REQUISITION_ARTICLE:            
            const newRequisitionArticles = state.requisitionArticles.map( article =>{
                if(article.article === action.payload.article){
                    article.quantity = action.payload.quantity
                }

                return article
            })

            return{
                ...state,
                requisitionArticles:newRequisitionArticles,
                message:null
            }

        case CREATE_REQUISITION:
            return{
                ...state,
                requisitionArticles:[],
                requisitionSelectedArticles:[],
                message:{
                    msg: 'Requisición creada con éxito',
                    category:'alerta-ok'
                }
            }
        
        
        case CREATE_ERROR:
            return{
                ...state,
                message:action.payload,
            }

        case GET_REQUISITIONS:
            return{
                ...state,
                requisitions:action.payload,
                message: null
            }

        case GET_APROVED_REQUISITIONS:
            return{
                ...state,
                aprovedRequisitions:action.payload
            }

        case DELETE_REQUISITION:
            return{
                ...state,
                requisitions: state.requisitions.filter( requisition => requisition._id !== action.payload)
            }

        case UPDATE_REQUISITION:
            const newRequisitions = state.requisitions.map( requisition =>{
                if(requisition._id === action.payload.requisition._id){
                    requisition = action.payload.requisition
                }

                return requisition
            })
            
            return{
                ...state,
                requisitions:newRequisitions,
                message:{
                    msg:'Requisición Actualizada con Éxito',
                    category:'alerta-ok'
                }
            }
    

        default:
            return state;
    }
}