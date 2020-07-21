import React from 'react'

const Encabezado = ({today}) =>{
    
    return(
        <React.Fragment>
            <div className="Orden__empresa one-half column">
                <h4>Tejidos Tecnicos Mallatex S.A. De C.V.</h4>
                <p className="Orden__empresa-datos">Av. Iturbide #5210, Zapopan, Jal.</p>
                <p className="Orden__empresa-datos"><span>Teléfono:</span> 3320164875</p>
                <p className="Orden__empresa-datos"><span>Email:</span> <a href = "mailto:mallatex@mallatex.com.mx">mallatex@mallatex.com.mx</a></p>
                <p className="Orden__empresa-datos"><span>Sitio Web:</span> <a href = "https://mallatex.com.mx/" target="_blank" rel="noopener noreferrer">https://mallatex.com.mx/</a></p>
            </div>

            <div className="Orden__fecha-folio one-half column">
                <label className="d-inline  " htmlFor="fecha">Fecha </label>
                <input type="date" name="fecha" value={today()} readOnly/>
                <br/>

                <label className="d-inline" htmlFor="folio">Folio </label>
                <input type="number" name="folio" value="1" readOnly/>
                <br/>

                <label className="d-inline" htmlFor="fechadecompra">Fecha de Compra </label>
                <input type="date" name="fechadecompra" required/>
                <br/>

                <label className="d-inline" htmlFor="moneda">Moneda </label>
                <select name="moneda" id="">
                    <option value="mxn">MXN</option>
                    <option value="usd">USD</option>
                </select>
            </div>
        </React.Fragment>
    )
}

export default Encabezado