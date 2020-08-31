import React, { useContext, useState  } from 'react'
import OrdersContext from '../../context/orders/ordersContext'
import AlertsContext from '../../context/alerts/alertsContext'
import { useEffect } from 'react'

const SearchBar = ({type}) =>{

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    const ordersContext = useContext(OrdersContext)
    const { providers, articles, selectArticles, selectedArticles, message} = ordersContext

    const [filteredProviders, setFilteredProviders] = useState([])
    const [filteredArticles, setFilteredArticles] = useState([])

    useEffect( () => {
        if(message){
            showAlert(message.msg,message.category)
        }
    }, [message])

    let title,placeholder
    switch(type){
        case 'provider':
            title = 'Busca tu Proveedor'
            placeholder = 'DigitaLife'
            break;

        case 'articles':
            title = 'Busca tus articulos'
            placeholder = 'Malla'
            break;
    }

    const handleChange = e => {
        if(type === 'provider'){
            setFilteredProviders(providers.filter( provider =>{
                return provider.name.toLowerCase().includes(e.target.value.toLowerCase())
            } ))
        }

        if(type === 'articles'){
            setFilteredArticles(articles.filter( article =>{
                return (article.description.toLowerCase().includes(e.target.value.toLowerCase()) || article.code.toLowerCase().includes(e.target.value.toLowerCase())  )
            }))
        }
    }

    const handleArticleClick = e =>{
        const [selected] = articles.filter( article => article._id === e.target.getAttribute('data-key'))
        //console.log(selected)

        let alreadyAdded
        //validar que no exista en articulos seleccionados
        if(selectedArticles){
            alreadyAdded = selectedArticles.find( article => article._id === selected._id)
        }

        if(alreadyAdded){
            showAlert('El articulo ya ha sido seleccionado', 'alerta-error')
            return
        }
        
        selectArticles(selected)
    }

    return(
        <React.Fragment>
            {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div>: null}
            <div className="Card">
                <div className="CardInner">
                    <label className="Search__Title">{title}</label>
                    <div className="CardContainer">
                        <div className="Icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </div>
                        <div className="InputContainer">
                            <input className="Search__Input" onChange={handleChange} placeholder={placeholder}/>
                        </div>
                    </div>
                </div>
                
                {filteredProviders.length > 0
                ?(
                    filteredProviders.map( filter =>{
                        return <button type="button" className="Search__item" key={filter._id}>{filter.name}</button>
                    })
                ) 
                :(
                    filteredArticles.map( filter =>{
                        return <button type="button" className="Search__item" onClick={handleArticleClick} key={filter._id} data-key={filter._id}> <span>{filter.code}</span> {filter.description}</button>
                    })
                )}
            </div>
        </React.Fragment>
    )
}

export default SearchBar