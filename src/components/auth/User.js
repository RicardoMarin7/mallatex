import React, { useContext, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

//Context
import AlertsContext from '../../context/alerts/alertsContext'
import AuthContext from '../../context/auth/authContext'

const User = ({ listedUser }) =>{

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    const authContext = useContext(AuthContext)
    const { user } = authContext

    const [ onUpdate, setOnUpdate ] = useState(false)
    
    const [ newPass, setNewPass ] = useState({
        password:'',
        confirm:''
    })

    const [ showPassword, setShowPassword ] = useState(false)

    const { password, confirm } = newPass



    const handleShowClick = articles =>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='Modal__review sombra'>
                        <h1>Articulos</h1>
                        <p>Articulos dentro de la orden</p>

                        <div className="row">
                                <button onClick={onClose} className="button button-primary">Cerrar</button>
                        </div>
                        
                        
                    </div>
                );
            }
        })
    }

    const handleUpdateSubmit = e =>{
        e.preventDefault()
    }

    
    const handleChange = e =>{
        setNewPass({
            [e.target.name] : e.target.value
        })
    }

    return(
        <li className="tarea sombra user" key={listedUser._id}>
            {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null}

            { onUpdate 
            ?(
                <div className="row User__update-active">
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="campo-form">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Password"
                                value={password}
                                required
                            />
                            {showPassword ? <i className="fas fa-eye-slash icon-password" onClick={ ()=> setShowPassword(true) }></i> : <i className="fas fa-eye" onClick={()=> setShowPassword(false)}></i> }
                        </div>

                        <div className="campo-form">
                            <label htmlFor="confirm">Confirmar Contraseña</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirm"
                                name="confirm"
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                value={confirm}
                                required
                            />
                            {showPassword ? <i className="fas fa-eye-slash icon-password" onClick={()=> setShowPassword(true)}></i> : <i className="fas fa-eye" onClick={()=> setShowPassword(false)}></i> }
                        </div>

                        <button
                            type="submit"
                            className="button button-blue u-full-width"
                            onClick={()=> alert('')}
                            >
                            Actualizar Contraseña
                        </button>

                        <button 
                            onClick={ () => setOnUpdate(false)} 
                            className="button button-primary u-full-width">
                                Cancelar
                        </button>

                    </form>
                </div>
            ) : null}

            <div className="row">
                <h2 className="no-margin">{listedUser.name}</h2>
                <p className="fw-700 txt-center">Nivel <span className="fw-400">{listedUser.level}</span></p>
                <p className="fw-700 txt-center">Email <span className="fw-400">{listedUser.email}</span></p>

                <button type="button" className="button button-primary u-full-width" onClick={() => setOnUpdate(true)}>Actualizar Contraseña</button>
                {/* <button type="button" className="button button-delete u-full-width" onClick={() => handleDeleteClick(user._id)}>Eliminar</button> */}

                {/* <button type="button" className="button button-primary" onClick={() => handleShowClick(order.articles)}>Ver informacion</button> */}
            </div>

            
            
        </li>
    )
}

export default User