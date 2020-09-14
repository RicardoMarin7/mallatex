import React, { useEffect, useContext} from 'react'
import RequisitionContext from '../../context/requisition/requisitionContext'
import Layout from '../layout/Layout'

//Components
import Requisition from './Requisition'

const Requisitions = () =>{

    const requisitionContext = useContext(RequisitionContext)
    const { getRequisitions, requisitions } = requisitionContext

    useEffect( () =>{
        getRequisitions()
    },[])

    return(
        <Layout>
            <ul className="listado-tareas">
                {requisitions.map( requisition => (
                    <Requisition 
                        requisition = {requisition}
                        key={requisition.folio}
                    />
                ))}
            </ul>
        </Layout>
    )
}

export default Requisitions