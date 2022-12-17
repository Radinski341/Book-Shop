import { useGlobalProvider } from "../context"
import { useEffect } from "react"
import { MainNav } from "../components/main-nav"
import { MobileNav } from "../components/mobile-nav"
import { Footer } from "../components/footer"
import Html from '../img/html.png'
import Css from '../img/css.png'
import Js from '../img/js.jfif'
import ReactImage from '../img/react.png'

const ReadMe = () => {
    const {dispatch} = useGlobalProvider()
    useEffect(() => {
        dispatch({type: 'CLOSE_NAV'})
    }, [dispatch])
    document.title = `Book shop | Read me`
    return <section className="read-me-section">
        <MainNav />
        <MobileNav />
        <div className="read-me-container">
            <div className="languages">
                <h1>About website</h1>
                <div className="info">
                    <p><i>This website is created for practising purposes! Books info is provided by <a href="https://gutendex.com/" blank='_'>Gutendex</a>(API provider).<br/> The main purpose of this website is to show some of my front end development skills. <br/><strong>Note: </strong><br/></i></p>
                    <ul>
                        <li>Website is not connected to backend server, so keep in mind that if you refresh the page your data will be lost.</li>
                        <li>Adds are not real</li>
                        <li>Book prices are auto generated</li>
                    </ul>
                </div>
                <hr/>
                <h1>Programming and markup languages used to create this site</h1>
                <div className="languages-used">
                    <div className="language">
                        <h2>HTML</h2>
                        <img src={Html} alt='html'/>
                    </div>
                    <div className="language">
                        <h2>CSS</h2>
                        <img src={Css} alt='css'/>
                    </div>
                    <div className="language">
                        <h2>JavaScript</h2>
                        <img src={Js} alt='javascript'/>
                    </div>
                    <div className="language">
                        <h2>React</h2>
                        <img src={ReactImage} alt='react'/>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </section>
}

export {ReadMe}