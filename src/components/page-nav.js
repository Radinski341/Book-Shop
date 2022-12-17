import React from "react";
import { useGlobalProvider } from "../context";
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom';


const Pagination = ({position}) => {
    const {pages, page} = useGlobalProvider();
   
    if(!isNaN(pages)){
    if(parseInt(page) === 1){
        if(pages === 1){
            return<nav className={position === 'up' ? "pagination-container" : "pagination-container-bottom"}>
                <AllPages />
            </nav>
        }
        else if(pages <= 10){
            return<nav className={position === 'up' ? "pagination-container" : "pagination-container-bottom"}>
                <AllPages />
                <NextPage />
            </nav>
        }else{
            return<nav className={position === 'up' ? "pagination-container" : "pagination-container-bottom"}>
                <FewPages />
                <NextPage />
            </nav>
        }
        
    }else if(page.toString() === pages.toString()){
        if(pages <= 7){
            return<nav className={position === 'up' ? "pagination-container" : "pagination-container-bottom"}>
                <PrevPage />
                <AllPages />
            </nav>
        }else{
            return<nav className={position === 'up' ? "pagination-container" : "pagination-container-bottom"}>
                <PrevPage />
                <FewPages />
            </nav>
        }
        
    }else{
        if(pages <= 7){
            return<nav className={position === 'up' ? "pagination-container" : "pagination-container-bottom"}>
                <PrevPage />
                <AllPages />
                <NextPage />
            </nav>
        }else{
            return<nav className={position === 'up' ? "pagination-container" : "pagination-container-bottom"}>
                <PrevPage />
                <FewPages />
                <NextPage />
            </nav>
        }
        
    }
}
}


const AllPages = () => {
    const {pages, page} = useGlobalProvider();
    let pagesList = [];
    for(let i= 1; i<=pages; i++){
        pagesList.push(`${i}`)
    }
    return <div className="pages"> 
    
        {pagesList.map((currPage) => {
            return <PageButton key={currPage} pageProp={currPage} classProp={parseInt(currPage) === parseInt(page)} />
        })}
    </div>
}

const FewPages = () => {
    const {pages, page} = useGlobalProvider();
    
    let numOfPages;
    if(pages){
        numOfPages = pages;
    }
    let pagesList = [];
    for(let i= 1; i<7; i++){
        pagesList.push(`${i}`) 
    }
    
    return <div className="pages all-pages"> 
        {pagesList.map((currPage) => {
            return <PageButton key={currPage} pageProp={currPage} classProp={parseInt(currPage) === parseInt(page)} />
        })}
        <MiddleButtons />
        <PageButton key={numOfPages} pageProp={numOfPages} classProp={parseInt(page) === parseInt(numOfPages)}/>
    </div>
    
}

const MiddleButtons = () => {
    const {pages, page} = useGlobalProvider();
  
    
    if( page <= 7){
        return<div className="middle-btns">
            <PageButton key={7} pageProp={7} classProp={parseInt(page) === 7}/>
            <PageButton key={8} pageProp={8} />
            <PageButton key={9} pageProp={9} /><div className='dots'>...</div>
        </div>
    }else if(page > 7 && parseInt(page) < parseInt(pages) - 2){
        return <div className="middle-btns">
            <div className='dots' style={{display: parseInt(page) === 8 && 'none'}}>...</div>
            <PageButton key={parseInt(page) - 1} pageProp={parseInt(page) - 1} />
            <PageButton key={parseInt(page)} pageProp={parseInt(page)} classProp={true}/>
            <PageButton key={parseInt(page) + 1} pageProp={parseInt(page) + 1} /><div className='dots'>...</div>
        </div>
    }else{
        return <div className="middle-btns">
            <div className='dots'>...</div>
            <PageButton key={parseInt(pages) - 3} pageProp={parseInt(pages) - 3} />
            <PageButton  key={parseInt(pages) - 2} pageProp={parseInt(pages) - 2} classProp={parseInt(page) === parseInt(pages) - 2}/>
            <PageButton  key={parseInt(pages) - 1} pageProp={parseInt(pages) - 1} classProp={parseInt(page) === parseInt(pages) -1} />
        </div>
    }
    

}

const PageButton = ({pageProp, classProp}) => {
    const {category, searchQuery} = useParams();
   
    return<Link  className={classProp ? 'active' : undefined} to={`../page/${pageProp.toString()}/${category}${searchQuery ? '/' + searchQuery : ''}`} > <button>{pageProp} </button></Link>
    
}

const PrevPage = () =>{
    const {pageID, category, searchQuery} = useParams();
    return <Link className="prev-next" to={`../page/${parseInt(pageID) -1}/${category}${searchQuery ? '/' + searchQuery : ''}`}> <button>&#8592;</button></Link>
}

const NextPage = () => {
    const {pageID, category, searchQuery} = useParams();
    return <Link className="prev-next" to={`../page/${parseInt(pageID) +1}/${category}${searchQuery ? '/' + searchQuery : ''}`}> <button>&#8594;</button></Link>
}

export {Pagination}
