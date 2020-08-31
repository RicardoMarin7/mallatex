import React from 'react'
import Loading from '../../img/icon_mallatex.png'

const Loader = () =>{
    return(
        <div className="loader">
            <img src={Loading} alt="Icono Mallatex" className="loader ld ld-dim" />
        </div>
    )
}

export default Loader