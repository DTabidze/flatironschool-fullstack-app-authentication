import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import Error from "./components/Error";
import Main from "./components/Main";
import Courses from "./components/Courses";
import Students from "./components/Students";
import Instructors from "./components/Instructors";
import Enroll from "./components/Enroll";
import Drop from "./components/Drop";
import Login from "./components/Login";
import CourseDetails from './components/CourseDetails';
import InstructorDetails from './components/InstructorDetails';
import StudentDetails from './components/StudentDetails';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    errorElement:<Error />,
    children:[
      {
        path:"/",
        element:<Main />,
        errorElement:<Error />
      },
      {
        path:"/home",
        element:<Main />,
        errorElement:<Error />
      },
      {
        path:"/courses",
        element:<Courses />,
        errorElement:<Error />
      },
      {
        path:"/courses/:courseId",
        element:<CourseDetails />,
        errorElement:<Error />
      },
      {
        path:"/students",
        element:<Students />,
        errorElement:<Error />
      },
      {
        path:"/students/:id",
        element:<StudentDetails />,
        errorElement:<Error />
      },
      {
        path:"/instructors",
        element:<Instructors />,
        errorElement:<Error />
      },
      {
        path:"/instructors/:id",
        element:<InstructorDetails />,
        errorElement:<Error />
      },
      {
        path:"/enroll",
        element:<Enroll />,
        errorElement:<Error />
      },
      {
        path:"/drop",
        element:<Drop />,
        errorElement:<Error />
      },
      {
        path:"/login",
        element:<Login />,
        errorElement:<Error />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
