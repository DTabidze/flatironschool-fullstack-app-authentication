import Student from "./Student"
import Instructor from "./Instructor";

function Enrollment({enrollment:{date,student,course}}){
   
    return(
        <div className="enrollment-div">
            <p>
                Date: {date}
            </p>
            {(course && course.title) ? <p>Course Title:{course.title}</p> : null}
            <p>
                Student Info
            </p>
            <Student student={student} key={student.id} />
            {(course && course.instructor) ? <p>Instructor Info</p> : null}
            {(course && course.instructor) ? <Instructor instructor={course.instructor} />: null }
            {/* 
            <p>
                Student Name: {student.fname} {student.lname}
            </p>
            {student.profile_pic ? <img src={student.profile_pic} alt="student" /> : null} */}

        </div>
    )
}

export default Enrollment;