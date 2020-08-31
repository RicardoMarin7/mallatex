import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertsContext from '../../context/alerts/alertsContext'
import AuthContext from '../../context/auth/authContext'

const NewAccount = (props) => {

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    const authContext = useContext(AuthContext)
    const { registerUser, message , auth} = authContext

    //en caso de que el usuario se haya autenticado, registrado o sea un registro duplicado
    useEffect( ()=>{
        if(message){
            const {msg,category} = message
            
            if(message.category === 'alerta-ok'){
                setNewUser({
                    name:'',
                    email:'',
                    password:'',
                    confirm:''
                })
            }
            showAlert(msg,category)
        }

    },[message,auth,props.history])

    const [newUser,setNewUser] = useState({
        name:'',
        email:'',
        password:'',
        confirm:''
    })

    const [showPassword,setShowPassword] = useState(false)
    

    const handleChange = e =>{
        setNewUser({
            ...newUser,
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

    const { name, email, password, confirm } = newUser

    const handleSubmit = e =>{
        e.preventDefault()
        if( name.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirm.trim() === ''
        ){
            showAlert('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        if(password.length < 8){
            showAlert('El password debe ser de al menos 8 caracteres', 'alerta-error')
            return
        }

        if(password !== confirm){
            showAlert('Los password deben ser iguales', 'alerta-error')
            return
        }

        registerUser({
            name,
            email,
            password
        })

    }

    return(
        <div className="form-usuario">
            {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div>: null}
            <div className="contenedor-form sombra-dark">
                <h1>Obten una nueva cuenta</h1>
                <form onSubmit={handleSubmit}>

                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            placeholder="Ricardo"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={name}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@example.com"
                            onChange={handleChange}
                            value={email}
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
                            value={password}
                        />
                        {showPassword ? <i className="fas fa-eye-slash icon-password" onClick={handleClick}></i> : <i className="fas fa-eye" onClick={handleClick}></i> }
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirm"
                            name="confirm"
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            value={confirm}
                        />
                        {showPassword ? <i className="fas fa-eye-slash icon-password" onClick={handleClick}></i> : <i className="fas fa-eye" onClick={handleClick}></i> }
                    </div>

                    <div className="campo-form">
                        <button className="btn-primario btn btn-block">Registrarme</button>
                    </div>

                    <Link to="/" className="enlace-cuenta">Ya tienes cuenta? Inicia sesion</Link>
                </form>
            </div>
        </div>
    )
}

export default NewAccount