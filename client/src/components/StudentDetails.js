import {useParams,useNavigate} from 'react-router-dom'
import {useState,useEffect} from "react"

function StudentDetails(){
    const {id}=useParams()
    const navigate=useNavigate()
    const URL=`/students/${id}`
    const [student,setStudent]=useState({})


    function load_student(){
        fetch(URL)
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            else{
                navigate("/students")
            }
        })
        .then(student=>setStudent(student))
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        load_student()
    },[])
    
    return(
        <div className="student-details-div">
            <h1>
                Student Details
            </h1>
            <p>
                Student ID: {student.id}
            </p>
            <p>
                Student Info: {student.fname} {student.lname}
            </p>
            {student.profile_pic ?   <svg className="profile-pic" version="1.1" xmlns="http://www.w3.org/2000/svg"><image href={student.profile_pic} alt="student" x="0" y="0" /></svg>: null}
            {(student.enrollments && student.enrollments.length>0) ? <h1>Course Enrollments</h1>:null}
            {(student.enrollments && student.enrollments.length>0) ? student.enrollments.map((enrollment,i)=><p key={i}>{enrollment.course.title}</p>) : null}
        </div>
    )
}

export default StudentDetails;