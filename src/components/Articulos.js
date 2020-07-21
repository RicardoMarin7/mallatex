import React, { useState } from 'react'

const Articulos = ({agregarArticulo}) =>{

    const [articulo,setArticulo] = useState({
        articulo:'',
        descripcion:'',
        unidad:'',
        cantidad:'',
        unitario:''
    })

    const {descripcion,unidad,cantidad,unitario} = articulo

    const handleChange = e =>{
        if(e.target.name === 'cantidad' || e.target.name === 'unitario'){
            setArticulo({
                ...articulo,
                [e.target.name] : parseFloat([e.target.value][0])
            }
            )
            return
        }

    

        setArticulo({
            ...articulo,
            [e.target.name] : [e.target.value][0]
        }
        )
    }

    const handleClick = e =>{
        
        //validar que no vengan vacios
        if( articulo.articulo.trim() === '' || descripcion.trim() === '' || unidad.trim() === '' || cantidad === '' || unitario === ''){
            console.log('error: campo vacio')
            return
        }
        
        //validar que el tipo de dato sea correcto
        if(isNaN(cantidad) || isNaN(unitario)){
            console.log('error not a number')
        }

        //agregar articulo a articulos
        agregarArticulo(articulo)

        //Resetear formulario
        setArticulo({
            articulo:'',
            descripcion:'',
            unidad:'',
            cantidad:'',
            unitario:''
        })
    }

    return(
        <React.Fragment>
            <h5 className="Orden__titulo">Agregar Articulo</h5>

            <div className="row">
                <div className="one-third column">
                    <label htmlFor="articulo">Articulo</label>
                    <input type="text" name="articulo" className="u-full-width" required onChange={handleChange} value={articulo.articulo} />
                </div>

                <div className="two-thirds column">
                    <label htmlFor="descripcion">Descripcion</label>  
                    <input type="text" name="descripcion" className="u-full-width" onChange={handleChange} required value={descripcion} />
                </div>
            </div>            

            <div className="row row-flex">
                <div className="one-third column">
                    <label htmlFor="unidad">Unidad</label>
                    <input type="text" name="unidad" onChange={handleChange} className="u-full-width" value={unidad} />
                </div>

                <div className="one-third column">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" name="cantidad" onChange={handleChange} className="u-full-width" value={cantidad} />

                </div>

                <div className="one-third column">
                    <label htmlFor="unitario">Precio Unitario</label>
                    <input type="number" name="unitario" onChange={handleChange} className="u-full-width" value={unitario} />
                </div>

                <button className="button button-primary margin-auto" type="button" onClick={handleClick}>Agregar articulo</button>
            </div>
        </React.Fragment>
    )
}

export default Articulos