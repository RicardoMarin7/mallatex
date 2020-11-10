import React, { useState } from 'react'

const Provider = ({listedProvider}) => {
    const [onUpdate, setOnUpdate ] = useState(false)

    const [provider, setProvider ] = useState({
        name: listedProvider.name,
        address: listedProvider.address,
        phone: listedProvider.phone,
        email: listedProvider.email
    })

    const {name, address, phone, email } = provider

    const handleChange = e =>{
        setProvider({
            ...provider,
            [e.target.name] : e.target.value
        })
    }

    const select = e =>{
        e.target.select()
    }

    return (
        <li className="tarea sombra user" key={listedProvider._id}>
            <div className={onUpdate ? "Article__hidden" : "Article__show"}>
                <h2 className="no-margin">{listedProvider.code}</h2>
                <p className="fw-700 txt-center">Nombre <span className="fw-400">{name}</span></p>
                <p className="fw-700 txt-center">Dirección <span className="fw-400">{listedProvider.address}</span></p>
                <p className="fw-700 txt-center">Teléfono <span className="fw-400">{listedProvider.phone}</span></p>
                <p className="fw-700 txt-center">Email <span className="fw-400">{listedProvider.email}</span></p>

                <button type="button" className="button button-primary u-full-width" onClick={() => setOnUpdate(!onUpdate)}>Actualizar Articulo</button>
                {/* <button type="button" className="button button-delete u-full-width" onClick={() => handleDeleteClick(user._id)}>Eliminar</button> */}

                {/* <button type="button" className="button button-primary" onClick={() => handleShowClick(order.articles)}>Ver informacion</button> */}
            </div>

            <div className={onUpdate ? "Article__show update" : "Article__hidden"}>
                <h3 className="txt-center">Actualizar {listedProvider.name}</h3>
                <div className="campo-form">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                placeholder="Descripcion"
                                value={name}
                                required
                                onClick={select}
                            />
                </div>

                <div className="campo-form">
                            <label htmlFor="address">Dirección</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                onChange={handleChange}
                                placeholder="linea"
                                value={address}
                                onClick={select}
                                required
                            />
                </div>

                <div className="campo-form">
                            <label htmlFor="phone">Teléfono</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                placeholder="Unidad"
                                value={phone}
                                onClick={select}
                                required
                            />
                </div>

                <div className="campo-form">
                            <label htmlFor="email">email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="email"
                                value={email}
                                onClick={select}
                                required
                            />
                </div>
            
                <button type="button" className="button button-primary u-full-width mrg-top-1rem" onClick={() => setOnUpdate(!onUpdate)}>Actualizar Proveedor</button>
                <button type="button" className="button button-delete u-full-width" onClick={() => setOnUpdate(!onUpdate)}>Cancelar</button>
            </div>
        </li>
    );
}
 
export default Provider;