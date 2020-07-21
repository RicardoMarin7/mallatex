import React from 'react'

const Proveedor = () =>(
    <React.Fragment>
        <div className="one-half column">
            <h5 className="Orden__titulo">Proveedor</h5>
            <label htmlFor="empresa">Empresa </label>
            <input type="text" name="empresa" placeholder="Digitalife" required className="u-full-width"/>

            <label htmlFor="departamento">Departamento </label>
            <input type="text" name="departamento" placeholder="Sistemas" required className="u-full-width" />

            <label htmlFor="direccion">Direccion </label>
            <input type="text" name="direccion" required className="u-full-width"/>

            <div className="row">
                <div className="one-half column">
                    <label htmlFor="email_empresa_externa">Email </label>
                    <input type="email" name="email_empresa_externa" className="u-full-width"/>    
                </div>

                <div className="one-half column">
                    <label htmlFor="direccion">Telefono </label>
                    <input type="number" name="telefono_empresa_externa" className="u-full-width"/>
                </div>
            </div>

        </div>

        <div className="one-half column">
            <h5 className="Orden__titulo">Creado por</h5>
            
            <label htmlFor="empleado">Empleado </label>
            <input type="text" name="empleado" readOnly required className="u-full-width"/>

            <label htmlFor="empresa_empleado">Empresa </label>
            <input type="text" name="empresa_empleado" value="Tejidos Tecnicos Mallatex S.A. De C.V." required className="u-full-width"/>

            <label htmlFor="direccion_empleado">Direccion </label>
            <input type="text" name="direccion_empleado" value="Av. Iturbide # 5210.Zapopan, Jal." required className="u-full-width"/>

            <div className="row">
                <div className="one-half column">
                    <label htmlFor="telefono_empleado">Telefono </label>
                    <input type="text" name="telefono_empleado"  required className="u-full-width"/>   
                </div>
                <div className="one-half column">
                    <label htmlFor="email_empleado">Email </label>
                    <input type="text" name="email_empleado"  required className="u-full-width"/>
                </div>
            </div>                
        </div>
    </React.Fragment>
)

export default Proveedor