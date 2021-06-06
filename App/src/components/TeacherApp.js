import TeacherView from "./TeacherView"
import CourseEdit from "./CourseEdit"
import { useState } from "react"

const TeacherApp = (props) => {
  const [selectedCourse, setSelectedCourse] = useState("")

  return selectedCourse === "" ? 
    <TeacherView 
      onCourseClick={(course) => setSelectedCourse(course)}
      onExit={props.onExit}/> :
    <CourseEdit 
      courseName={selectedCourse} 
      onReturn={() => setSelectedCourse("")}
      onExit={props.onExit}/>
}

export default TeacherApp
