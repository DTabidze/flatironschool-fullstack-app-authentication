import image1 from "../images/slide-show-1.jpeg"
import image2 from "../images/slide-show-2.jpeg"
import image3 from "../images/slide-show-3.jpeg"
import image4 from "../images/slide-show-4.jpeg"

import {useState,useEffect} from "react"

let interval

function Main(){

    const[idx,setIdx]=useState(0)
    const images=[image1,image2,image3,image4]

    useEffect(()=>{
        if(!interval){
            interval=setInterval(()=>{
                setIdx(idx=>idx+1)
            },1500)
        }
    })
      

    return(
        <div className="main-content">
            <h1>
                Flatiron School Fullstack App
            </h1>
            <div>
                <svg className="slide-show-div" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" x="0" y="0">
                    <image className="slide-show-img" href={images[idx%images.length]} />
                </svg>
            </div>
        </div>
    )
}

export default Main;