import React from "react";
import {myData} from '../my-data'
import {NavLink, useParams} from 'react-router-dom';
import { SearchBooks } from "./search-engine";

const CategoryNav = () => {
    const {pageID} = useParams();
    let page = '1'
    if(pageID){page = pageID}
    
    return<div className="wrapper">
        <nav id='sidebar'>
            <SearchBooks />
            <div className="title">
                Categories
            </div>
            
            <ul className="list-items">
                <li key={'allCategoriesID'}><NavLink className={({isActive}) => isActive ? 'cat-link cat-active' : 'cat-link'} to={`../../page/${page}/all`} >All categories </NavLink> </li>
                {myData.categories.map((category, index) => {
                    return <li key={index}><NavLink className={({isActive}) => isActive ? 'cat-link cat-active' : 'cat-link'} to={`../../page/${page}/${category}`} >{category} </NavLink> </li>
                })}
            </ul>
        </nav>
    </div>
}

export {CategoryNav}