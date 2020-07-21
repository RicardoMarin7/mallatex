import React, {useState} from 'react'
import Encabezado from './Encabezado'
import Proveedor from './Proveedor'
import Envio from './Envio'
import Articulos from './Articulos'
import ListadoArticulos from './ListadoArticulos'

const OrdenDecompra = () => {

    /* Agregar articulos */
    const [articulos,setArticulos] = useState([])

    const agregarArticulo = articulo =>{
        console.log(articulo)
        setArticulos([
            ...articulos,
            articulo
        ]
        )    
    }

    const today = e =>{
        let fecha = new Date()
        let dia = String(fecha.getDate()).padStart(2,'0')
        let mes = String(fecha.getMonth() + 1).padStart(2,'0')
        let anho = fecha.getFullYear()

        return fecha = `${anho}-${mes}-${dia}`
    }
    
    const handleSubmit = e =>{
        e.preventDefault()
    }


    return (
        <React.Fragment>
            <h3 className="Orden__titulo">Orden de Compra</h3>
            <form onSubmit={handleSubmit} className="Orden__empresa">
                <div className="row">
                    <Encabezado today={today} />
                </div>{/* Datos de Mallatex,moneda,folio etc */}

                <div className="row">
                    <Proveedor />                                        
                </div> {/* Datos de empresa y empleado */}

                <div className="row">
                    <Envio />
                </div>

                <div className="row">
                    <Articulos agregarArticulo={agregarArticulo} />
                </div>

                <div className="row">
                    <ListadoArticulos articulos={articulos} />
                </div>

                <button className="button button-primary u-full-width">Enviar</button>
            </form>

        </React.Fragment>
    )   
}

export default OrdenDecompra