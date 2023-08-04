import {useState,useEffect} from "react"
import Instructor from "./Instructor"

function Instructors(){

    const URL="/instructors"
    const [instructors,setInstructors]=useState([])

    function load_instructors(){
        fetch(URL)
        .then(res=>res.json())
        .then(instructors=>setInstructors(instructors))
        .catch(err=>console.log(err))
    }
    

    useEffect(()=>{
        load_instructors()
    },[])


    return (
        <div>
            <h1>
                Our Instructors
            </h1>
            <div className="instructors-div">
                {instructors.map(instructor=><Instructor instructor={instructor} key={instructor.id} />)}
            </div>
        </div>
    )
}

export default Instructors;