import React, { useState, useContext } from 'react'
import AlertsContext from '../../context/alerts/alertsContext'
import Layout from '../layout/Layout'

const NewArticle = () => {

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

    const [newArticle,setNewArticle] = useState({
        code:'',
        description:'',
        unit:'',
        line:''
    })

    

    const handleChange = e =>{
        setNewArticle({
            ...newArticle,
            [e.target.name]:e.target.value
        })
    }

    const { code, description, unit, line } = newArticle

    const handleSubmit = e =>{
        e.preventDefault()
        if( code.trim() === '' ||
            description.trim() === '' ||
            unit.trim() === '' ||
            line.trim() === ''
        ){
            showAlert('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        const invalid = /\s/

        if(invalid.test(code)){
            showAlert('El código no puede tener espacios en blanco', 'alerta-error')
            return
        }

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
                <h1>Crear un nuevo articulo</h1>
                <form onSubmit={handleSubmit}>

                    <div className="campo-form">
                        <label htmlFor="code">Código (Sin Espacios) </label>
                        <input 
                            type="text"
                            placeholder="ACZAO1A"
                            id="code"
                            name="code"
                            onChange={handleChange}
                            value={code}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="description">Descripción</label>
                        <input 
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Malla Sombra"
                            onChange={handleChange}
                            value={description}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="unit">Unidad</label>
                        <input
                            type="text"
                            id="unit"
                            name="unit"
                            onChange={handleChange}
                            placeholder="PZ"
                            value={unit}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="line">Linea</label>
                        <input
                            type="text"
                            id="line"
                            name="line"
                            onChange={handleChange}
                            placeholder="ALAM"
                            value={line}
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
export default NewArticle;