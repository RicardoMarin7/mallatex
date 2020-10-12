import { 
    SUCCESSFUL_LOGIN,
    FAILURE_LOGIN,
    SUCCESSFUL_REGISTER,
    FAILURE_REGISTER,
    GET_USER,
    LOGOUT,
    GET_USERS
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

        case SUCCESSFUL_LOGIN:
            localStorage.setItem('mallatex-token', action.payload.token)
            return{
                ...state,
                auth:true,
                message:{
                    msg: action.payload.msg,
                    category:'alerta-ok'
                },
                loading:true
            }
        
        case FAILURE_REGISTER:
        case FAILURE_LOGIN:
            localStorage.removeItem('mallatex-token')
            return{
                ...state,
                token:null,
                message:action.payload,
                loading:true
            }
        
        case LOGOUT:
            localStorage.removeItem('mallatex-token')
            return{
                ...state,
                auth:null,
                token:null,
                user:null,
                loading:true
            }

        case GET_USER:
            let {
                _id,
                email,
                name,
                level
            } = action.payload.user

            return{
                ...state,
                user:{
                    _id,
                    email,
                    name,
                    level
                },
                auth:true,
                loading:true
            }
        
        case GET_USERS:
            return{
                ...state,
                users:action.payload
            }

        default:
            return state
    }
}