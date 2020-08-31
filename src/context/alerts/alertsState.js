import React, {useReducer} from 'react'
import alertsReducer from '../alerts/alertsReducer'
import alertsContext from '../alerts/alertsContext'

import { 
    SHOW_ALERT,
    HIDE_ALERT
} 
from '../../types'

const AlertsState = props =>{
    const initialState = {
        alert:null
    }

    const [state,dispatch] = useReducer(alertsReducer,initialState)

    //Functions
    const showAlert = (msg,category) =>{
        dispatch({
            type:SHOW_ALERT,
            payload:{
                msg,
                category
            }
        })

        setTimeout( ()=>{
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000)
    }

    return(
        <alertsContext.Provider
            value ={{
                    alert: state.alert,
                    showAlert
                }
            }
        >
            {props.children}
        </alertsContext.Provider>
    )
}

export default AlertsState