import {Link} from "react-router-dom"

function Instructor({instructor:{id,fname,lname,profile_pic}}){
    return(
        <Link to={`/instructors/${id}`}>
            <div className="instructor-div">
                <p>
                    First Name: {fname}
                </p>
                <p>
                    Last Name: {lname}
                </p>
                {profile_pic ? <svg className="profile-pic" version="1.1"
                    xmlns="http://www.w3.org/2000/svg"><image href={profile_pic} alt={`${fname} ${lname}`} x="0" y="0" /></svg> : null}
            </div>
        </Link>
    )
}

export default Instructor;