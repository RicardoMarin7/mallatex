import React, { useContext, useState, useEffect } from 'react'

import RequisitionContext from '../../context/requisition/requisitionContext'
import RequisitionSearchBar from '../requisition/RequisitionSearchBar'
import RequisitionInfo from './RequisitionInfo'

const SelectRequisition = () =>{

    const requisitionContext = useContext(RequisitionContext)
    const { getRequisitions , requisitions } = requisitionContext

    const [ filteredRequisitions, setFilteredRequisitions ] = useState([])

    useEffect( () =>{
        getRequisitions()
    },[requisitions])

 
    

    return(
        <React.Fragment>
            <ul className="listado-tareas">
                <RequisitionSearchBar 
                    requisitions={requisitions}
                    filteredRequisitions={filteredRequisitions}
                    setFilteredRequisitions={setFilteredRequisitions}
                />

                {filteredRequisitions.length === 0 
                ?(
                    requisitions.map( requisition => (
                        <RequisitionInfo 
                            requisition = {requisition}
                            key={requisition.folio}
                        />
                    ))
                ):(
                    filteredRequisitions.map( requisition => (
                        <RequisitionInfo 
                            requisition = {requisition}
                            key={requisition.folio}
                        />
                    ))
                )}

                
            </ul>
            
        </React.Fragment>

    )
}

export default SelectRequisition
