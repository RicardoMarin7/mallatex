import React, { useReducer } from 'react'
import AuthContext from '../auth/authContext'
import AuthReducer from '../auth/authReducer'
import AxiosClient from '../../config/Axios'
import authToken from '../../config/authToken'


import { 
    SUCCESSFUL_LOGIN,
    FAILURE_LOGIN,
    SUCCESSFUL_REGISTER,
    FAILURE_REGISTER,
    GET_USER,
    GET_USERS,
    LOGOUT
} 
from '../../types'

const AuthState = props =>{
    const initialState={
        token: localStorage.getItem('mallatex-token'),
        auth: null,
        user: null,
        message: null,
        loading: false,
        users:[]
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState)

    //functions

    //Registra un usuario
    const registerUser = async data =>{
        try {
            const response = await AxiosClient.post('/api/users/new',data)
            console.log(response)
            dispatch({
                type:SUCCESSFUL_REGISTER,
                payload:response.data
            })

            //Obtener usuario
            //userAuthenticated()
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
                type:FAILURE_REGISTER,
                payload:alert
            })
        }
    }

    // Retorna el usuario autenticado
    const userAuthenticated = async () =>{
        const token = localStorage.getItem('mallatex-token')
        if(token){
            //Enviar token por header
            authToken(token)
            try {
                const response = await AxiosClient.get('/api/auth')
                //console.log(response)
                dispatch({
                    type:GET_USER,
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
                    type:FAILURE_LOGIN,
                    payload:alert
                })
            }
        }
    }

    const getUsers = async () =>{
        try {
            const response = await AxiosClient.get('/api/users/')
            const users = response.data.users
            dispatch({
                type: GET_USERS,
                payload: users
            })
        } catch (error) {
            console.log(error)
        }
    }

    const Login = async (data) => {
        try {
            const response = await AxiosClient.post('/api/auth/login',data)
            dispatch({
                type:SUCCESSFUL_LOGIN,
                payload:response.data
            })

            userAuthenticated()
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
                type:FAILURE_LOGIN,
                payload:alert
            })
        }
    }

    //Cerrar sesion
    const LogOut = () =>{
        dispatch({
            type:LOGOUT
        })
    }
    
    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                auth:state.auth,
                user:state.user,
                message:state.message,
                loading:state.loading,
                users:state.users,
                registerUser,
                Login,
                userAuthenticated,
                LogOut,
                getUsers,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
