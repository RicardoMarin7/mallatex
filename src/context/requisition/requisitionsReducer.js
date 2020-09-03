import { 
    SELECT_ARTICLE,
    GET_ARTICLES,
    DELETE_SELECTED_ARTICLE

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

        case DELETE_SELECTED_ARTICLE:
            return{
                ...state,
                requisitionSelectedArticles:state.requisitionSelectedArticles.filter( article => article._id !== action.payload )
            }

        default:
            return state;
    }
}