import React, { useContext , useEffect, useState} from 'react';

//Components
import Layout from '../layout/Layout'
import Article from './Article'
import ArticleSearchBar from './ArticleSearchBar'

//Context
import OrdersContext from '../../context/orders/ordersContext'

const Articles = () => {

    const ordersContext = useContext(OrdersContext)
    const { getArticles, articles } = ordersContext

    const [ filteredItems, setFilteredItems ] = useState(null)

    useEffect( ()=>{
        getArticles()
    },[])
    
    return (
        <Layout>
            <h1>{articles.length} Articulos</h1>
            <ArticleSearchBar
                allItems={articles}
                setFilteredItems={setFilteredItems}
            />
            <ul className="listado-usuarios">
                
                {filteredItems ? (
                    filteredItems.map( article => (
                        <Article 
                            listedArticle = {article}
                            key={article._id}
                        />
                    ))
                ) : (
                        articles.map( article => (
                            <Article 
                                listedArticle = {article}
                                key={article._id}
                            />
                        ))
                    
                )}

                
            </ul>
        </Layout>
    )
}
 
export default Articles;