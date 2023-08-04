import {useState,useEffect} from "react"
import Student from "./Student";

function Students(){

    const [students,setStudents]=useState([])
    const STUDENTS_URL="/students"

    useEffect(()=>{
        load_students()
    },[])

    function load_students(){
        fetch(STUDENTS_URL)
        .then(res=>res.json())
        .then(students=>setStudents(students))
        .catch(err=>console.log(err))
    }
    
    return (
        <div className="students-div">
            <h1>
                Our Students
            </h1>
            <div className="students-div">
                {students.map(student=><Student student={student} key={student.id} />)}
            </div>
        </div>
    )
}

export default Students;