import React from "react";
import { useGlobalProvider } from "../context";
import {Link} from 'react-router-dom';
import { MainNav } from "../components/main-nav";
import { MobileNav } from "../components/mobile-nav";
import { useEffect } from "react";
import { Footer } from "../components/footer";


const Cart = () => {
    const {cart, dispatch} = useGlobalProvider();
    
    useEffect(() => {
        dispatch({type: 'CLOSE_NAV'})
    }, [dispatch])
    let total = 0
    cart.forEach(element => {
        total+= parseInt(element.price) * element.inCart - -0.99 * element.inCart
    });
    let cartCount = 0;
    cart.forEach(element => {
        cartCount += element.inCart
    });

    document.title = `Book shop | Cart(${cartCount})`
    if(cart.length === 0){
        return(
            <div className="cart">
                <MainNav />
                <MobileNav />
                <div className="cart-container">
                    <h1>Your cart is empty, check out our books!</h1>
                    <Link to='../page/1/all'><button className="checkout">Buy books</button></Link>
                </div>
            </div>
        )
    }
    return <div className="cart">
        <MainNav />
        <MobileNav />
        <div className="cart-container">
            
            {cart.map(item => {
                return <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.title}/>
                    <div className="item-description">
                        <h1>{item.title}</h1>
                        <p>By: {item.authors}</p>
                    </div>
                    <p className="each">Each: ${item.price}.99</p>
                    <div className="item-action">
                        <button onClick={() =>dispatch({type: 'INCREASE', payload: item.id})}>+</button>
                        <p>{item.inCart}</p>
                        <button onClick={() =>dispatch({type: 'DECREASE', payload: item.id})}>-</button>
                    </div>
                    <div className="item-price">
                        <h2>Total: ${item.price * item.inCart - -0.99 * item.inCart}</h2>
                    </div>
                </div>
            })}
            <div className="order-info">
                <div className="total">
                    <p>Total items:</p>
                    <h3>{cartCount}</h3>
                </div>
                <div className="total">
                    <p>Total price:</p>
                    <h3>${Math.round(total*100)/100}</h3>
                </div>
            </div>
            <button  className="checkout">CHECKOUT(${Math.round(total*100)/100})</button>
            <h1 className="clear-fix"> &nbsp;</h1>
        </div>
        <Footer />
    </div>
}

export {Cart}