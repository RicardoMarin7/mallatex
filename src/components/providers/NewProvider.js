import React, { useState, useContext } from 'react'
import AlertsContext from '../../context/alerts/alertsContext'
import Layout from '../layout/Layout'

const NewProvider = () => {

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    //en caso de que el usuario se haya autenticado, registrado o sea un registro duplicado
    // useEffect( ()=>{
    //     if(message){
    //         const {msg,category} = message
            
    //         if(message.category === 'alerta-ok'){
    //             setNewUser({
    //                 name:'',
    //                 email:'',
    //                 password:'',
    //                 confirm:'',
    //                 level:1,
    //             })
    //         }
    //         showAlert(msg,category)
    //     }

    // },[message])

    const [newProvider,setNewProvider] = useState({
        name:'',
        address:'',
        phone:'',
        email:''
    })

    

    const handleChange = e =>{
        setNewProvider({
            ...newProvider,
            [e.target.name]:e.target.value
        })
    }

    const { name, address, phone, email } = newProvider

    const handleSubmit = e =>{
        e.preventDefault()
        if( name.trim() === '' ||
            address.trim() === '' ||
            phone.trim() === '' ||
            email.trim() === ''
        ){
            showAlert('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        const invalid = /\s/

        showAlert('Articulo creado con éxito','alerta-ok')



        // registerUser({
        //     name,
        //     email,
        //     password,
        //     level
        // })

    }

    return ( 
        <Layout>
            {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : <div className={`alerta`}></div>}
            
            <div className="contenedor-form sombra-dark mrg-auto">
                <h1>Crear un nuevo proveedor</h1>
                <form onSubmit={handleSubmit}>

                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            placeholder="Wal-Mart"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={name}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="address">Dirección</label>
                        <input 
                            type="text"
                            id="address"
                            name="address"
                            placeholder="P. Sherman Calle Wallaby #42, Sidney"
                            onChange={handleChange}
                            value={address}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="phone">Télefono</label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            onChange={handleChange}
                            placeholder="4123123112"
                            value={phone}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="email@example.com"
                            value={email}
                        />
                    </div>

                    <div className="campo-form">
                        <button className="btn-primario btn btn-block">Crear Articulo</button>
                    </div>

                    {/* <Link to="/" className="enlace-cuenta">Ya tienes cuenta? Inicia sesion</Link> */}
                </form>
            </div>
        </Layout>
    )
}
export default NewProvider;