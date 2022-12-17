import React from "react";
import { useGlobalProvider } from '../context';
import { Link , useParams} from "react-router-dom";
import {BsFillCartFill } from 'react-icons/bs'

const Book = ({id, title, image, authors, price,  inCart}) => {
    const {dispatch} = useGlobalProvider();
    const{pageID, category} = useParams();
    return <article className="book-product" >
        <div className="is-in-cart" style={{display: inCart === 0 && 'none'}}><BsFillCartFill/><span className='cart-count'>{inCart}</span></div>
        <Link to={`/page/${pageID}/${category}/book/${id}`}>
            <h4>{title.length > 41 ? `${title.substring(0, 39)}...` : title}</h4>
            <img  src={image} alt={title} />
        </Link>
        <p className="author">By: {authors}</p>
        <p className="price">${price}.99</p>
        <button onClick={() => dispatch({type: 'ADD_TO_CART', payload: id})}>Add to cart</button>
        
    </article>
}

export {Book}

