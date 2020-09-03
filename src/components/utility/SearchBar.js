import React, { useContext, useState  } from 'react'
import OrdersContext from '../../context/orders/ordersContext'
import AlertsContext from '../../context/alerts/alertsContext'
import RequisitionContext from '../../context/requisition/requisitionContext'
import { useEffect } from 'react'

const SearchBar = ({type, context}) =>{

    const alertsContext = useContext(AlertsContext)
    const { alert, showAlert } = alertsContext

    const ordersContext = useContext(OrdersContext)
    const { providers, articles, selectedArticles, message, selectProvider} = ordersContext

    const requisitionContext = useContext(RequisitionContext)
    const { requisitionSelectedArticles, selectRequisitionArticles } = requisitionContext

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

    const handleProviderClick = e =>{
        const [selected] = providers.filter( provider => provider._id === e.target.getAttribute('data-key'))
        selectProvider(selected)
        setFilteredProviders('')

    }

    const handleArticleClick = e =>{
        const [selected] = articles.filter( article => article._id === e.target.getAttribute('data-key'))
        //console.log(selected)

        let alreadyAdded

        if(context === 'requisition'){
            if(requisitionSelectedArticles){
                alreadyAdded = requisitionSelectedArticles.find( article => article._id === selected._id)
            }
        }
        else{
            if(selectedArticles){
                alreadyAdded = selectedArticles.find( article => article._id === selected._id)
            }
        }
        //validar que no exista en articulos seleccionados
        if(alreadyAdded){
            showAlert('El articulo ya ha sido seleccionado', 'alerta-error')
            return
        }
        
        if(context === 'requisition'){
            selectRequisitionArticles(selected)
        }
        else{
            selectedArticles(selected)
        }
        
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
                        return <button type="button" className="Search__item" onClick={handleProviderClick} key={filter._id} data-key={filter._id}>{filter.name}</button>
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