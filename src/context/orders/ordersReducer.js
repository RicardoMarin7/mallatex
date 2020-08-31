import { 
    FORM_ORDER,
    GET_ORDERS,
    ADD_ORDER,
    VALIDATE_FORM,
    ACTUAL_ORDER,
    DELETE_ORDER,
    GET_PROVIDERS,
    GET_ARTICLES,
    SELECT_ARTICLE,
    DELETE_SELECTED_ARTICLE,
    SELECT_PROVIDER
} from '../../types'

export default (state,action) =>{

    switch(action.type){

        case GET_ORDERS:
            return{
                ...state,
                projects: action.payload
            }

        case ADD_ORDER:
            return{
                ...state,
                projects: [...state.projects, action.payload],
                formNewProject : false,
                errorForm: false
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

        default:
            return state;
    }
}