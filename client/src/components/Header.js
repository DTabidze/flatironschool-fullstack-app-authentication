import {Link} from "react-router-dom"

function Header(){

    
    return(
        <header className="header">
            
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                        <Link to="/students">Students</Link> 
                    </li>
                    <li>
                        <Link to="/instructors">Instructors</Link>
                    </li>
                    <li>
                         <Link to="/enroll">Enroll in course</Link> 
                    </li>
                    <li>
                         <Link to="/drop">Drop course</Link> 
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Header