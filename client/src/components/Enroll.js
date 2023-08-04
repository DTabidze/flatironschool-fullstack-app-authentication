import {useState} from "react"
import Enrollment from "./Enrollment"

function Enroll(){
  
    const URL="/enrollments"
    const [data,setData]=useState({title:"",student_id:0})
    const [newEnrollment,setNewEnrollment]=useState({})
    

    function handleChange(e){
        const name=e.target.name
        const value=e.target.value
        setData({
            ...data,[name]:value
        })   
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            else{
                alert("Something went wrong.  Maybe you are already enrolled in the course or the course/student does not exist.")
            }
        })
        .then(enrollment=>{
            if(enrollment){
                setNewEnrollment(enrollment)
            }
        })
    }
   
    return(
        <div>
            <h1>
                Enroll in Course
            </h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="title">Course Title:</label>
                    <input type="text" name="title" onChange={handleChange} value={data.title} />
                </div>
                <div>
                    <input type="submit" value="submit" />
                </div>
            </form>
            {(newEnrollment && Object.keys(newEnrollment).length>0) ? <><h2>Enrollment Info:</h2><Enrollment enrollment={newEnrollment} /></> : null}
        </div>
    )
}

export default Enroll;