import {useParams,useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";
import Enrollment from "./Enrollment.js";
import Instructor from "./Instructor"

function CourseDetails(){
    const navigate=useNavigate()
    const {courseId}=useParams()
    const URL=`/courses/${courseId}`
    const [course,setCourse]=useState({})

    useEffect(()=>{
        fetch(URL)
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            else{
                navigate("/courses")
            }
        })
        .then(course=>setCourse(course))
        .catch(err=>console.log(err))
    },[])

    
    console.log(course)
    const {id,title,instructor,enrollments}=course
    const instructor_full_name=instructor  ? `${instructor.fname} ${instructor.lname}` : ""
    //const instructor_info=instructor ? <p>Instructor: {instructor_full_name}</p>: null
    //const instructor_profile_pic=instructor ? <div><img className="profile-pic" src={instructor.profile_pic} alt={instructor_full_name} /></div> : null

    return(
        <div className='course-details-div'>
            <h1>
                Course Details
            </h1>
            <p>
                Title: {title}
            </p>
            <p>
                Course ID: {id}
            </p>
            {instructor ? <Instructor instructor={instructor} key={instructor.id} /> : null}
            {(enrollments && enrollments.length >0) ? <h2>Student Enrollments</h2> : null}
            {(enrollments && enrollments.length>0) ? <div className="enrollments-div">{enrollments.map(enrollment=><Enrollment enrollment={enrollment} key={enrollment.id} />)}</div> : null}
        </div>
    )
}

export default CourseDetails;