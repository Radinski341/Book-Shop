import { useGlobalProvider } from "../context"
import {RxDoubleArrowLeft} from 'react-icons/rx'
import { NavLink } from "react-router-dom"
import { useParams } from "react-router-dom"
import { myData } from "../my-data"
import {ImHome, ImInfo, ImBooks} from 'react-icons/im'
import { SearchBooks } from "./search-engine"
const MobileNav = () => {
    const {isNavOpen, dispatch} = useGlobalProvider();
    const {pageID, category} = useParams()
    let page, cat;
    pageID ? page = pageID : page = '1'
    category ? cat = category : cat = 'all'
    return(
        <div className={`mobile-nav ${isNavOpen && 'mobile-nav-open'}`}>
            <SearchBooks />
            <button className="close-nav" onClick={() => dispatch({type: 'CLOSE_NAV'})}><RxDoubleArrowLeft /></button>
            <div className='mobile-nav-links'>
                <NavLink className={({isActive}) => isActive ? 'link active-link' : 'link'} to={'../'}><ImHome /> Home</NavLink>
                <NavLink className={({isActive}) => isActive ? 'link active-link' : 'link'} to={'../read-me'}><ImInfo />About</NavLink>
                <NavLink className={({isActive}) => isActive ? 'link active-link' : 'link'} to={`../page/${page}/${cat}`}><ImBooks />Book Shop</NavLink>
                
            </div>
            <ul className="list-items">
                <li key={'allCategoriesID'}><NavLink className={({isActive}) => isActive ? 'cat-link cat-active' : 'cat-link'} to={`../../page/${page}/all`} >All categories </NavLink> </li>
                {myData.categories.map((category, index) => {
                    return <li key={index}><NavLink className={({isActive}) => isActive ? 'cat-link cat-active' : 'cat-link'} to={`../../page/${page}/${category}`} >{category} </NavLink> </li>
                })}
            </ul>
        </div>
    )
}

export {MobileNav}