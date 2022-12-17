import adsImg from "../img/ads.jpg"
import adsImg2 from "../img/ads2.jpg"

const Advertisement = () => {
    return<div className="add-container">
        <div className="add1">
            <img src={adsImg} alt="advertisement"/>
            <p>advertisement</p>
        </div>
        <div className="add2">
            <img src={adsImg2} alt="advertisement"/>
            <p>advertisement</p>
        </div>
       
    </div>
}

export {Advertisement}