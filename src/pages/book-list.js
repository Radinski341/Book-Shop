import React from "react";
import { useGlobalProvider } from '../context';
import { Book } from "../components/book";
import {useParams} from 'react-router-dom';
import { useFetch } from "../fetch-data";
import {Pagination} from "../components/page-nav";
import { SearchBooks } from "../components/search-engine";
import { CategoryNav } from '../components/category-nav'
import {Outlet } from 'react-router-dom'
import { MobileNav } from "../components/mobile-nav";
import {MainNav} from '../components/main-nav'
import { Footer } from "../components/footer";
import { Loading } from "../components/loading";
import { Advertisement } from "../components/ads";
import noResults from "../img/no-results.webp"


const BooksList = () => { 
    
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 50) {
            document.querySelector(".main-nav").classList.add('sticky-nav');
        } else {
            document.querySelector(".main-nav").classList.remove('sticky-nav');
        }
    }
    const {data, isLoading, isNavOpen} = useGlobalProvider();
    const {pageID, category, searchQuery} = useParams();

    document.title = `Book shop | ${category === 'all' ? '' : `${category.toUpperCase()} books`} ${searchQuery === undefined ?'' : searchQuery}`
    let prepareQuery;
    let url;
    if(searchQuery){
        prepareQuery = searchQuery.split(' ')
        url = `https://gutendex.com/books/?page=${pageID}&search=${prepareQuery.join('%20').toLowerCase()}`
    }else{
        url = `https://gutendex.com/books/?page=${pageID}&topic=${category === 'all' ? '' : category}`
    }
    
    useFetch(url, pageID) 
    if(isLoading){
        return <Loading/>
    }
    if(data.length === 0){
        return<div className="container">
            <MobileNav />
            <MainNav />
            <CategoryNav />
            <div>
                <img style={{width: '100%', height: '100%'}} src={noResults} alt='No results'/>
            </div>
        </div>
    }
    return <div className="container">
        <MobileNav />
        <MainNav />
        <CategoryNav/>
        <main className="books-list-container" style={{filter: isNavOpen ? 'blur(8px)' : 'blur(0px)'}}>
            <div className="search-box-mobile"><SearchBooks /></div>
            <Pagination position='up'/>
            <div className="books-list">
                {data.map(item => {
                    return (
                        <Book key={item.id} id={item.id} title = {item.title} image = {item.image} inCart={item.inCart} authors={item.authors} price ={item.price}/>
                    )
                })}
            </div>
            <Pagination  />
        </main>
        <Advertisement />
        <Outlet />
        <Footer />
    </div>
}
 export {BooksList}