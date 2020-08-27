import React, { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import AlertsContext from '../../context/alerts/alertsContext'
import AuthContext from '../../context/auth/authContext'
import { useEffect } from 'react'

const Login = (props) => {

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    const authContext = useContext(AuthContext)
    const { message , auth, Login} = authContext

    const [login,setLogin] = useState({
        email:'',
        password:''
    })

    useEffect( ()=>{
        if(message){
            showAlert(message.msg,message.category)
        }

        if(auth){
            props.history.push('/orders')
        }

    },[message,auth])

    const [showPassword,setShowPassword] = useState(false)

    const { email, password } = login

    const handleChange = e =>{
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })
    }

    const handleClick = e =>{
        if(showPassword){
            setShowPassword(false)
        }
        else{
            setShowPassword(true)
        }
    }

    const handleSubmit = e =>{
        e.preventDefault()

        if(email.trim() === '' || password.trim() === ''){
            showAlert('Todos los campos son obligatorios','alerta-error')
            return
        }

        Login({ email, password })
    }

    return(
        <div className="form-usuario">
            {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div>: null}
            <div className="contenedor-form sombra-dark">
                <h1>Inicia sesion con tu cuenta</h1>
                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@example.com"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        {showPassword ? <i className="fas fa-eye-slash icon-password" onClick={handleClick}></i> : <i className="fas fa-eye icon-password" onClick={handleClick}></i> }
                    </div>

                    <div className="campo-form">
                        <button className="btn-primario btn btn-block">Iniciar Sesion</button>
                    </div>

                    <Link to="/new-account" className="enlace-cuenta">Aun no tienes una cuenta? Registrate</Link>
                </form>
            </div>
        </div>
    )
}

export default Login