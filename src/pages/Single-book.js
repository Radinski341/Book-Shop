import { useGlobalProvider } from "../context"
import { useParams, Navigate, Link } from "react-router-dom";
import { MobileNav } from "../components/mobile-nav";
import {MainNav} from '../components/main-nav'
import { CategoryNav } from '../components/category-nav'
import { myData } from "../my-data";
import { Footer } from "../components/footer";
import { BsFillCartFill } from "react-icons/bs";

const SingleBook = () => {
    const {data, cart, dispatch} = useGlobalProvider();
    const {bookID, pageID, category} = useParams();
    
    let book = data.find(item => parseInt(item.id) === parseInt(bookID));
    if(!book){
        book = cart.find(item => parseInt(item.id) === parseInt(bookID));
    }
    if(!book){
        book = myData.weekBooks.find(item => parseInt(item.id) === parseInt(bookID));
    }
    if(book === undefined){return <Navigate to='/page/1/all'/>}
    const inCart = book.inCart
    document.title = book.title
    return (
        <section className="container">
            <MobileNav />
            <MainNav />
            <CategoryNav/>
            
            <div className="book-description-container">
            <div className="is-in-cart in-cart" style={{display: inCart === 0 && 'none'}}><BsFillCartFill/><span className='cart-count'>{inCart}</span></div>
                <Link  to={`/page/${pageID}/${category}`}><button>&#8592;</button></Link>
                <div className="book-image">
                    <img src={book.image} alt={book.title} />
                </div>
                <div className="book-description">
                    <h1 className="title">{book.title}</h1>
                    <p className="authors">From: {book.authors}</p>
                    <p className="subjects">Subjects covering: {book.subjects.map(item => {
                        return `${item}, `
                    })}</p>
                    <h1 className="price">${book.price}.99</h1>
                </div>
                <div className="book-action">
                    <button onClick={() => dispatch({type: 'ADD_TO_CART', payload: book.id})}>Add to cart</button>
                </div>
            </div>
           
            <Footer />
        </section>
    )
}

export {SingleBook}