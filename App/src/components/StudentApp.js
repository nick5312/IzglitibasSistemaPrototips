import StudentView from "./StudentView"
import CourseView from "./CourseView"
import { useState } from "react"

const StudentApp = (props) => {
  const [selectedCourse, setSelectedCourse] = useState("")

  return selectedCourse === "" ? 
    <StudentView 
      onCourseClick={(course) => setSelectedCourse(course)}
      onExit={props.onExit}/> :
    <CourseView 
      courseName={selectedCourse} 
      onReturn={() => setSelectedCourse("")}
      onExit={props.onExit}/>
}

export default StudentApp
