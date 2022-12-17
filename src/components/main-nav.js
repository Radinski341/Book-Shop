
import {NavLink, Link, useParams} from 'react-router-dom';
import {useGlobalProvider} from '../context'
import {FaBars} from 'react-icons/fa'
import {BsFillCartDashFill } from 'react-icons/bs'
import MyLogo from '../img/book-shop-logo.png'


const MainNav = () => {
    
    
    const {cart, dispatch, isNavOpen} = useGlobalProvider();
    let cartCount = 0;
    cart.forEach(element => {
        cartCount += element.inCart
    });

    const {pageID, category} = useParams()
    let page, cat;
    pageID ? page = pageID : page = '1'
    category ? cat = category : cat = 'all'

    return(
        <nav className='main-nav' style={{filter: isNavOpen ? 'blur(8px)' : 'blur(0px)'}}>
            <button onClick={() => dispatch({type: 'OPEN_NAV'})} className='open-nav'><FaBars /></button>
            <Link className='logo' to={'/'}><img className='logo'src={MyLogo} alt='logo'/></Link>
            
            <div className='main-nav-links'>
                <NavLink className={({isActive}) => isActive ? 'link active-link' : 'link'} to={'../'}>Home</NavLink>
                <NavLink className={({isActive}) => isActive ? 'link active-link' : 'link'} to={'../read-me'}>Read Me</NavLink>
                <NavLink className={({isActive}) => isActive ? 'link active-link' : 'link'} to={`../page/${page}/${cat}`}>Book Shop</NavLink>
            </div>
            <div className='cart'>
                <NavLink className={({isActive}) => isActive ? 'link active-link' : 'link'} to='/cart'><BsFillCartDashFill/><span className='cart-count'>{cartCount}</span></NavLink>
            </div>
        </nav>
    )
} 

export {MainNav}