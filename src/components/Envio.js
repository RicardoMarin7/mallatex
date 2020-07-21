import React from 'react'

const Envio = () => (
    <React.Fragment>
        <div className="one-third column">
            <label className="Orden__titulo u-full-width" htmlFor="enviado_mediante">Enviado mediante </label>
            <input type="text" name="enviado_mediante" className="u-full-width"/>
        </div>
        <div className="one-third column">
            <label className="Orden__titulo u-full-width" htmlFor="fob">F.O.B</label>
            <input type="text" name="fob" className="u-full-width"/>
        </div>
        <div className="one-third column">
            <label className="Orden__titulo u-full-width" htmlFor="empleado">Empleado </label>
            <input type="text" name="empleado" className="u-full-width"/>
        </div>
    </React.Fragment>
)

export default Envio