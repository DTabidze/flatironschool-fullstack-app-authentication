import {useState,useEffect} from "react"
import { useNavigate,useOutletContext } from "react-router-dom"

function Drop(){

    const [data,setData]=useState({student_id:0,title:""})
    
    function handleChange(e){
        const name=e.target.name
        const value=e.target.value
        setData({
            ...data,[name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const URL=`/enrollments/${data.student_id}:${data.title}`
        fetch(URL,{
            method:"DELETE"
        })
        .then(res=>{
            if(res.ok){
                alert("You have been unenrolled")
            }
            else{
                alert("Something went wrong.  Maybe the course/student does not exist or you are not enrolled in the course.")
            }
        })
    }
    
    return(
        <div>
            <h1>
                Drop Course
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Course Title:</label>
                    <input type="text" name="title" onChange={handleChange} value={data.title} />
                </div>
                <div>
                    <input type="submit" value="submit" />
                </div>
            </form>
        </div>
    )
}

export default Drop;