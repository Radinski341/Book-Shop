
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {BooksList} from './pages/book-list'
import {Cart} from './pages/cart'
import {Home} from './pages/Home'
import {SingleBook} from './pages/Single-book'
import {ReadMe} from './pages/Read-me'
import { ErrorPage } from './pages/error404'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='page/:pageID/:category' element={<BooksList />} /> 
        <Route path='page/:pageID/:category/book/:bookID' element={<SingleBook />} />
        <Route path='page/:pageID/:category/:searchQuery' element={<BooksList />} />
        <Route path='read-me' element={<ReadMe />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
