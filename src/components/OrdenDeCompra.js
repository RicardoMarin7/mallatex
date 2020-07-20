import React from 'react'

const OrdenDecompra = () => {

    const today = e =>{
        let fecha = new Date()
        let dia = String(fecha.getDate()).padStart(2,'0')
        let mes = String(fecha.getMonth() + 1).padStart(2,'0')
        let anho = fecha.getFullYear()

        return fecha = `${anho}-${mes}-${dia}`
    }
    


    return (
        <React.Fragment>
            <h3 className="Orden__titulo">Orden de Compra</h3>
            <div className="row">
                <div className="Orden__empresa one-half column">
                    <h4>Tejidos Tecnicos Mallatex S.A. De C.V.</h4>
                    <p className="Orden__empresa-datos">Av. Iturbide #5210, Zapopan, Jal.</p>
                    <p className="Orden__empresa-datos"><span>Teléfono:</span> 3320164875</p>
                    <p className="Orden__empresa-datos"><span>Email:</span> <a href = "mailto:mallatex@mallatex.com.mx">mallatex@mallatex.com.mx</a></p>
                    <p className="Orden__empresa-datos"><span>Sitio Web:</span> <a href = "https://mallatex.com.mx/" target="_blank" rel="noopener noreferrer">https://mallatex.com.mx/</a></p>
                </div>
                <div className="Orden__fecha-folio one-half column">
                    <p className="no-margin"><span>Fecha:</span> <input type="date" name="fecha" value={today()} readOnly/></p>
                    <p className="no-margin"><span>Folio:</span> <input type="number" name="folio" value="1" readOnly/> </p>
                </div>
            </div>
            
        </React.Fragment>
    )   
}

export default OrdenDecompra