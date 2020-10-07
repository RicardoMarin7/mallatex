import React, { useContext, useEffect, useState } from 'react'
import OrdersContext from '../../context/orders/ordersContext'
import Order from './Order'

import Layout from '../layout/Layout'

const Orders = () =>{

    const ordersContext = useContext(OrdersContext)
    const { getOrders, orders } = ordersContext
    // const [ filteredRequisitions, setFilteredRequisitions ] = useState([])

    useEffect( () =>{
        getOrders()
    },[orders])

    return(
        <Layout>
            <h1>Ordenes</h1>
            <ul className="listado-tareas">
                {/* <RequisitionSearchBar 
                    requisitions={requisitions}
                    filteredRequisitions={filteredRequisitions}
                    setFilteredRequisitions={setFilteredRequisitions}
                /> */}

                {orders.map( order => (
                            <Order 
                                order = {order}
                                key={order.folio}
                            />
                        ))
                }
            </ul>
        </Layout>
    )
}

export default Orders