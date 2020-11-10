import React, { useState } from 'react'

const Article = ({listedArticle}) => {
    const [onUpdate, setOnUpdate ] = useState(false)

    const [article, setArticle ] = useState({
        description: listedArticle.description,
        line: listedArticle.line,
        unit: listedArticle.unit
    })

    const {description, line, unit } = article

    const handleChange = e =>{
        setArticle({
            ...article,
            [e.target.name] : e.target.value
        })
    }

    const select = e =>{
        e.target.select()
    }

    return (
        <li className="tarea sombra user" key={listedArticle._id}>
            <div className={onUpdate ? "Article__hidden" : "Article__show"}>
                <h2 className="no-margin">{listedArticle.code}</h2>
                <p className="fw-700 txt-center">Descripción <span className="fw-400">{description}</span></p>
                <p className="fw-700 txt-center">Linea <span className="fw-400">{listedArticle.line}</span></p>
                <p className="fw-700 txt-center">Unidad <span className="fw-400">{listedArticle.unit}</span></p>

                <button type="button" className="button button-primary u-full-width" onClick={() => setOnUpdate(!onUpdate)}>Actualizar Articulo</button>
                {/* <button type="button" className="button button-delete u-full-width" onClick={() => handleDeleteClick(user._id)}>Eliminar</button> */}

                {/* <button type="button" className="button button-primary" onClick={() => handleShowClick(order.articles)}>Ver informacion</button> */}
            </div>

            <div className={onUpdate ? "Article__show" : "Article__hidden"}>
                <h3 className="txt-center">Actualizar {listedArticle.code}</h3>
                <div className="campo-form">
                            <label htmlFor="description">Descripción</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                onChange={handleChange}
                                placeholder="Descripcion"
                                value={description}
                                required
                                onClick={select}
                            />
                </div>

                <div className="campo-form">
                            <label htmlFor="line">Linea</label>
                            <input
                                type="text"
                                id="line"
                                name="line"
                                onChange={handleChange}
                                placeholder="linea"
                                value={line}
                                onClick={select}
                                required
                            />
                </div>

                <div className="campo-form">
                            <label htmlFor="unit">Unidad</label>
                            <input
                                type="text"
                                id="unit"
                                name="unit"
                                onChange={handleChange}
                                placeholder="Unidad"
                                value={unit}
                                onClick={select}
                                required
                            />
                </div>
            
                <button type="button" className="button button-primary u-full-width mrg-top-1rem" onClick={() => setOnUpdate(!onUpdate)}>Actualizar</button>
                <button type="button" className="button button-delete u-full-width" onClick={() => setOnUpdate(!onUpdate)}>Cancelar</button>
            </div>
        </li>
    );
}
 
export default Article;