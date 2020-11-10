import React, { useContext , useEffect, useState} from 'react';

//Components
import Layout from '../layout/Layout'
import Provider from './Provider'
import ProviderSearchBar from './ProviderSearchBar'

//Context
import OrdersContext from '../../context/orders/ordersContext'

const Providers = () => {

    const ordersContext = useContext(OrdersContext)
    const { getProviders, providers } = ordersContext

    const [ filteredItems, setFilteredItems ] = useState(null)

    useEffect( ()=>{
        getProviders()
    },[])
    
    return (
        <Layout>
            <h1>{providers.length} Proveedores</h1>
            <ProviderSearchBar
                allItems={providers}
                setFilteredItems={setFilteredItems}
            />
            <ul className="listado-proveedores">
                
                {filteredItems ? (
                    filteredItems.map( provider => (
                        <Provider 
                            listedProvider= {provider}
                            key={provider._id}
                        />
                    ))
                ) : (
                        providers.map( provider => (
                            <Provider 
                                listedProvider= {provider}
                                key={provider._id}
                            />
                        ))
                    
                )}

                
            </ul>
        </Layout>
    )
}
 
export default Providers;