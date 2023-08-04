import {useState,useEffect} from "react"
import {useParams,useNavigate} from "react-router-dom"

function InstructorDetails(){

    const {id}=useParams()
    const navigate=useNavigate()
    const URL=`/instructors/${id}`
    const [instructor,setInstructor]=useState({})

    useEffect(()=>{
        load_instructor()
    },[])

    function load_instructor(){
        fetch(URL)
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            else{
                navigate("/instructors")
            }
        })
        .then(instructor=>setInstructor(instructor))
        .catch(err=>console.log(err))
    }
    const fullName=`${instructor.fname} ${instructor.lname}`
    return(
        <div className="instructor-div">
            <h1>
                Instructor Details
            </h1>
            <p>
                Instructor ID: {instructor.id}
            </p>
            <p>
                Instructor Info: {instructor.fname} {instructor.lname}
            </p>
            {instructor.profile_pic ?  <svg className="profile-pic" version="1.1" xmlns="http://www.w3.org/2000/svg"><image href={instructor.profile_pic} alt={fullName} x="0" y="0" /></svg> : null}
            {(instructor.courses && instructor.courses.length>0) ? <h2>Courses</h2> : null}
            {(instructor.courses && instructor.courses.length>0) ? instructor.courses.map(course=><p key={course.id}>{course.title}</p>) : null}
        </div>
    )
}

export default InstructorDetails;