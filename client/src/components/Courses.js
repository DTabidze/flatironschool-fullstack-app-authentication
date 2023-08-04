import Course from "./Course"
import {useEffect,useState} from "react"

function Courses(){

    const COURSES_URL="/courses"
    const [courses,setCourses]=useState([])

    useEffect(()=>{
        load_courses()
      },[])
    
      function load_courses(){
        fetch(COURSES_URL)
        .then(res=>res.json())
        .then(courses=>setCourses(courses))
        .catch(err=>console.log(err))
      }
    
    return(
        <div>
            <h1>
                Our Courses
            </h1>
            <div className="courses-div">
                {courses.map(course=><Course course={course} key={course.id} />)}
            </div>
        </div>
    )
}

export default Courses;