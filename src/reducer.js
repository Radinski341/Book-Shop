import { myData } from "./my-data";

function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return{
                ...state,
                isLoading:true
            }
        
        case 'GET_DATA':
            let setNewData;
            let item = {}
            let count = 1
            //Check if something in cart, to update inCart value
            if(state.cart.length > 0){
               
                let inCartProducts = [];
                state.cart.forEach(cartProduct => {
                    count = -1;
                    setNewData = action.payload.results.map(dataProduct => {
                        if(cartProduct.id === dataProduct.id || inCartProducts.includes(dataProduct.id)){
                            !inCartProducts.includes(dataProduct.id) &&inCartProducts.push(dataProduct.id)
                            if(inCartProducts.length === 0){
                                return cartProduct
                            }
                            count++;
                            item = state.cart.filter(item => item.id === inCartProducts[count])
                            return item[0]
                        }else{
                            return{
                                id: dataProduct.id,
                                title: dataProduct.title,
                                image: dataProduct.formats['image/jpeg'],
                                authors: dataProduct.authors[0]?.name,
                                price: dataProduct.id.toString().substring(0, 2),
                                inCart: 0,
                                subjects: dataProduct.subjects
                            }
                        }
                    })
                })
            }else {
                setNewData = action.payload.results.map(product => {
                    return{
                        id: product.id,
                        title: product.title,
                        image: product.formats['image/jpeg'],
                        authors: product.authors[0]?.name,
                        price: product.id.toString().substring(0, 2),
                        inCart: 0,
                        subjects: product.subjects
                    }
                })
            }
            
            return{
                ...state, 
                data: setNewData,
                records: action.payload.records, 
                pages: Math.ceil(action.payload.records / 32),
                cart: state.cart,
                isLoading: false,
                page: action.payload.page
            }
        case 'ADD_TO_CART':
            //Update object 'data.inCart'
            let newData = state.data.map(product => {
                if(product.id === action.payload){
                    return{
                        ...product,
                        inCart: product.inCart + 1
                    }
                }else {
                    return{...product}
                }
            })
            //Check if added product is in the card
            let productInCart = false;
            let oldCart;
            if(state.cart.length > 0){
                state.cart.forEach(cartProduct => {
                    if(cartProduct.id === action.payload){
                        oldCart = state.cart.map(product => {
                            if(product.id === cartProduct.id){
                                productInCart = true;
                                return {
                                    ...product,
                                    inCart: product.inCart + 1
                                }
                            }else{
                                return product;
                            }
                        })
                    }
                })
            }
            if(productInCart){
                return{
                    ...state,
                    data: newData,
                    cart: oldCart
                }
            }else{
                let newProduct = state.data.filter(newProduct => newProduct.id === action.payload)
                if(newProduct.length > 0){
                    
                    newProduct[0].inCart = newProduct[0].inCart + 1
                }else{
                    newProduct = myData.weekBooks.filter(product => product.id === action.payload)
                    newProduct[0].inCart = newProduct[0].inCart + 1
                }
                
                return{
                    ...state,
                    data: newData,
                    cart: [...state.cart, ...newProduct]
                }
            }
        case 'SET_SEARCH':
            return{
                ...state,
                searchValue: action.payload
            }
        case 'CLEAR_SEARCH':
            return{
                ...state,
                searchValue: ''
            }
        case 'OPEN_NAV':
            return{
                ...state,
                isNavOpen: true
            }
        case 'CLOSE_NAV':
            return{
                ...state,
                isNavOpen: false
            }
        case 'INCREASE':
            const increasedCart = state.cart.map(item => {
                console.log(item.id, action.payload)
                if(parseInt(action.payload) === parseInt(item.id)){
                    return{
                        ...item,
                        inCart: parseInt(item.inCart) + 1
                    }
                }
                return item
            })
            
            return{
                ...state,
                cart: increasedCart
            }
        case 'DECREASE':
            //Filter cart if item is 1 -> 0
            let underOne = state.cart.find(item => parseInt(item.id) === parseInt(action.payload) && parseInt(item.inCart) === 1)
            let filteredCart = state.cart
            if(underOne){
                filteredCart = state.cart.filter(itemToRemove => parseInt(itemToRemove.id) !== parseInt(underOne.id))
            }
            myData.weekBooks.map(item => {
                if(parseInt(item.id) === parseInt(action.payload)){
                    return{
                        ...item,
                        inCart: item.inCart - 1
                    }
                    
                }
                return{
                    ...item
                }
            })
            let decreasedCart = filteredCart.map(item => {
                if(parseInt(action.payload) === parseInt(item.id)){
                    
                    return{
                        ...item,
                        inCart: parseInt(item.inCart) - 1
                    }
                }
                return item
            })
            
            return{
                ...state,
                cart: decreasedCart
            }
        default:
            return{...state}
    }
}

export {reducer}