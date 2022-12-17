import {Link } from 'react-router-dom'
import { useEffect } from 'react';
import { SearchBooks } from '../components/search-engine';
import { MobileNav } from "../components/mobile-nav";
import {MainNav} from '../components/main-nav'
import { useGlobalProvider } from '../context';
import { myData } from '../my-data';
import { Footer } from '../components/footer';


import SwiperCore, {Autoplay, Navigation, Pagination } from 'swiper/core';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/autoplay';
SwiperCore.use([Autoplay, Navigation,Pagination])
const Home = () => {
  const {isNavOpen, dispatch} = useGlobalProvider()
  const {weekBooks} = myData
  useEffect(() => {
    dispatch({type: 'CLOSE_NAV'})
  }, [dispatch])
  document.title = `Book shop | Home`
  return (
  <>
    <MobileNav />
    <MainNav />
    <div className='section-home' style={{filter: isNavOpen ? 'blur(8px)' : 'blur(0px)'}}>
      
      <div className='weekly-books-container'>
        <h1 className='title'>Top 10 weekly books</h1>
        <SearchBooks />
        <h1 className='title mobile-title'>Top 10 weekly books</h1>
        <Swiper
      // install Swiper modules
        modules={[ Autoplay]}
        spaceBetween={30}
        loop={true}
        slidesPerView={'auto'}
        centeredSlides={true}
        autoplay={{delay: '2500'}}
        navigation={true} className="my-swiper"
        style={{padding: '30px 0'}}
      >
        {weekBooks.map((element, index) => {
              return<SwiperSlide key={index} className={`card`}>
              <div className={`card-container`} key={index} style={{backgroundImage: `url(${element.image})`}}>
                <div className='card-description'>
                  <h1>{element.title}</h1>
                  <p>By {element.authors}</p>
                  <h3>${element.price}.99</h3>
                </div>
                
                
                <Link className='check-out' to={`page/1/all/book/${element.id}`}>CHECK OUT <br/>&#8659;</Link>
                
              </div>
              </SwiperSlide>
        })}
      </Swiper> 
      <div className='hero'>
        <div className='hero-title'>
          <h1>Today reader, tomorrow leader</h1>
          <h2>Pick your favorite book from more than 69000+ books...</h2>
        </div>
        <div className='hero-library'>
          <h2>Your online library is here </h2>
          <Link className='btn-explore' to='page/1/all'>Explore &#187;</Link>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  </>
  );
};
export {Home}