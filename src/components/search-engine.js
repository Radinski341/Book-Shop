import { Link } from "react-router-dom";
import { useGlobalProvider } from "../context";
import { FaSearch } from 'react-icons/fa'
import React from "react";

const SearchBooks = () => {
    const {dispatch, searchValue} = useGlobalProvider()
    const [focus, setFocus] = React.useState(false)
    function handleSubmit(e){
        e.preventDefault();

    }
    function handleChange(e){
        dispatch({type: 'SET_SEARCH', payload: e.target.value})
    }
    
    return <>
        <form onSubmit={handleSubmit} className="search-box">
            <input  style={{outline: focus && 'none'}} type='text' placeholder='Search book...' onChange={handleChange} value={searchValue} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}/>
            <Link to={`/page/1/all/${searchValue}`} ><button><FaSearch /></button></Link>
        </form>
    </>
}

export {SearchBooks}