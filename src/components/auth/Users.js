import React, { useContext, useEffect } from 'react'

//Components
import Layout from '../layout/Layout'
import User from '../auth/User'

//Context
import AuthContext from '../../context/auth/authContext'

const Users = () =>{

    const authContext = useContext(AuthContext)
    const { getUsers, users } = authContext


    useEffect( () =>{
        getUsers()
    },[])

    return(
        <Layout>
            <h1>Usuarios</h1>
            <ul className="listado-usuarios">
                {/* <RequisitionSearchBar 
                    requisitions={requisitions}
                    filteredRequisitions={filteredRequisitions}
                    setFilteredRequisitions={setFilteredRequisitions}
                /> */}

                {users.map( user => (
                            <User 
                                listedUser = {user}
                                key={user._id}
                            />
                        ))
                }
            </ul>
        </Layout>
    )
}

export default Users