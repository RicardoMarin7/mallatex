import React, { useEffect, useContext, useState} from 'react'
import RequisitionContext from '../../context/requisition/requisitionContext'
import Layout from '../layout/Layout'


//Components
import RequisitionSearchBar from './RequisitionSearchBar'
import Requisition from './Requisition'

const Requisitions = () =>{

    const requisitionContext = useContext(RequisitionContext)
    const { getRequisitions, requisitions } = requisitionContext
    const [ filteredRequisitions, setFilteredRequisitions ] = useState([])

    useEffect( () =>{
        getRequisitions()
    },[requisitions])
    

    return(
        <Layout>
            <ul className="listado-tareas">
                <RequisitionSearchBar 
                    requisitions={requisitions}
                    filteredRequisitions={filteredRequisitions}
                    setFilteredRequisitions={setFilteredRequisitions}
                />

                {filteredRequisitions.length === 0 
                ?(
                    requisitions.map( requisition => (
                        <Requisition 
                            requisition = {requisition}
                            key={requisition.folio}
                        />
                    ))
                ):(
                    filteredRequisitions.map( requisition => (
                        <Requisition 
                            requisition = {requisition}
                            key={requisition.folio}
                        />
                    ))
                )}

                
            </ul>
        </Layout>
    )
}

export default Requisitions