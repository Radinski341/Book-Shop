import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { CategoryNav } from "./category-nav"
import { Footer } from "./footer"
import { Advertisement } from "./ads"

const Loading = () => {
    const skeletons = ['','','','','','','','']
    return <div className="container">
        <MobileNav/>
        <MainNav/>
        <CategoryNav/>
        <main className="books-list-container">
            
                <div className="pagination-loader"></div>
                <div className="books-list">
                    {skeletons.map((_, index) => {
                        return <div key={index} className="shared-dom">
                        <div className="long-title-loader"></div>
                        <div className="title-loader"></div>
                        <div className="book-loader"></div>
                        <div className="title-loader"></div>
                        <div className="shorter-title-loader"></div>
                        <div className="shortest-title-loader"></div>
                        <div className="button-loader"></div>
                    </div>
                    })}
                </div>
            
        </main>
        <Advertisement />
        <Footer/>
    </div>
    
}

export {Loading}