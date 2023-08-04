import {Link} from "react-router-dom"

function Course({course:{id,title}}){
    return(
        <Link to={`/courses/${id}`}>
            <div className="course-div">
                <p>
                    {title}
                </p>
            </div>
        </Link>
    )
}

export default Course;