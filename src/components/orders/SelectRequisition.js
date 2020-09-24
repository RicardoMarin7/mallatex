import React, { useContext, useState, useEffect } from 'react'

import RequisitionContext from '../../context/requisition/requisitionContext'
import RequisitionSearchBar from '../requisition/RequisitionSearchBar'
import RequisitionInfo from './RequisitionInfo'
import Loader from '../utility/Loader'

const SelectRequisition = () =>{

    const requisitionContext = useContext(RequisitionContext)
    const { getAprovedRequisitions , aprovedRequisitions } = requisitionContext
    const [ filteredRequisitions, setFilteredRequisitions ] = useState([])

    useEffect( () =>{
        getAprovedRequisitions()
    },[])


    return(
        <React.Fragment>
            <ul className="listado-tareas">
                <RequisitionSearchBar 
                    requisitions={aprovedRequisitions}
                    filteredRequisitions={filteredRequisitions}
                    setFilteredRequisitions={setFilteredRequisitions}
                />

                {filteredRequisitions.length === 0 
                ?(
                    aprovedRequisitions.map( requisition => (
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
