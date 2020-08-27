import { 
    SUCCESSFUL_LOGIN,
    FAILURE_LOGIN,
    SUCCESSFUL_REGISTER,
    FAILURE_REGISTER,
    GET_USER,
    LOGOUT
} 
from '../../types'
export default (state,action) =>{
        
    switch(action.type){
        case SUCCESSFUL_REGISTER:
            localStorage.setItem('mallatex-token', action.payload.token)
            return{
                ...state,
                auth:true,
                message:{
                    msg: action.payload.msg,
                    category:'alerta-ok'
                }
            }

        case FAILURE_REGISTER:
            return{
                ...state,
                token:null,
                message:action.payload
            }

        case SUCCESSFUL_LOGIN:
            localStorage.setItem('mallatex-token', action.payload.token)
            return{
                ...state,
                auth:true,
                message:{
                    msg: action.payload.msg,
                    category:'alerta-ok'
                }
            }

        case FAILURE_LOGIN:
            localStorage.removeItem('mallatex-token')
            return{
                ...state,
                token:null,
                message:action.payload
            }

        case GET_USER:
            return{
                ...state,
                user:action.payload
            }
        default:
            return state
    }
}