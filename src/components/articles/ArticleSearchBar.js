import React from 'react';


const ArticleSearchBar = ({allItems, setFilteredItems}) => {


    const handleChange = e => {
        setFilteredItems(allItems.filter( item =>{
            return (item.description.toLowerCase().includes(e.target.value.toLowerCase()) || item.code.toLowerCase().includes(e.target.value.toLowerCase()))
            })
        )
    }

    return(
        <React.Fragment>
            <div className="Card">
                <div className="CardInner">
                <label className="Search__Title">Busqueda de articulos</label>
                    <div className="CardContainer">
                        <div className="Icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </div>
                        <div className="InputContainer">
                            <input type="search" className="Search__Input" onChange={handleChange} placeholder="Buscar articulo por código"/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ArticleSearchBar;