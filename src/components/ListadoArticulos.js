import React from 'react'

const ListadoArticulos = ({articulos}) => {

    return(
        <React.Fragment>
            <h5 className="Orden__titulo">Listado de Articulos</h5>
            <table className="u-full-width">
                <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Descripcion</th>
                        <th>Unidad</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map( articulo =>{
                        let importe = articulo.cantidad * articulo.unitario
                        return(
                            <tr>
                                <td>{articulo.articulo}</td>
                                <td>{articulo.descripcion}</td>
                                <td>{articulo.unidad}</td>
                                <td>{articulo.cantidad}</td>
                                <td>{articulo.unitario}</td>
                                <td>{importe}</td>
                            </tr>
                        )
                        
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ListadoArticulos