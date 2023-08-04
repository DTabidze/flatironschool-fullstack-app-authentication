import {Link} from "react-router-dom"

function Student({student:{id,fname,lname,profile_pic}}){
    return(
        <Link to={`/students/${id}`}>
            <div className="student-div">
                <p>
                    First Name: {fname}
                </p>
                <p>
                    Last Name: {lname}
                </p>
                <div>
                    <svg className="profile-pic" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0">
                        <image href={profile_pic} alt={`${fname} ${lname}`} />
                    </svg>
                </div>
            </div>
        </Link>
    )
}

export default Student;