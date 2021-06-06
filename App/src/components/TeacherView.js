import { createUseStyles } from 'react-jss'
import CustomCalendar from './Calendar'

const useStyles = createUseStyles({
  mainContainer: {
    display: "grid",
    gridTemplateRows: "50px auto"
  },
  scheduleContainer: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 60px"
  },
  teacherInfoContainer: {
    display: "grid",
    gridTemplateColumns: "150px repeat(2, minmax(0, 1fr))",
  },
  teacherAvatar: {
    width: "100px",
    height: "100px",
    marginBottom: "5px"
  },
  coursesContainer: {
    display: "grid",
    gridTemplateColumns: "100px minmax(0, 1fr)",
  },
})

const TeacherView = (props) => {
  const classes = useStyles()

  const courseData = [{
    code: "DIP321",
    name: "Algoritmi un programmēšanas metodes"
  }, {
    code: "DIP001",
    name: "Bakalaura Darbs"
  }, {
    code: "DIP392",
    name: "Lietišķo datorsistēmu programmatūra"
  }, {
    code: "HSP378",
    name: "Politoloģija"
  }, {
    code: "DIP383",
    name: "Programmatūras izstrādes tehnoloģija"
  }]

  return (
    <div className="flex justify-center h-full w-full">
      <div className={`${classes.mainContainer} grid-cols-4 w-full 2xl:w-3/5`}>
        <div className="col-span-4 bg-gray-200 flex">
          <div 
            className="px-3 h-full hover:bg-gray-300 flex flex-col justify-center cursor-pointer" 
            onClick={() => props.onReturn && props.onReturn()}>
            <p>SĀKUMS</p>
          </div>
          <div 
            className="px-3 h-full hover:bg-gray-300 flex flex-col justify-center justify-self-end cursor-pointer" 
            onClick={() => props.onExit && props.onExit()}>
            <p>IZIET</p>
          </div>
        </div>
        <div className="col-span-3 p-14 bg-gray-50">
          <p className="text-xl">PASNIEDZĒJS</p>
          <hr className="border-gray-200 my-2"/>
          <div className="inline-block">
            <div className="row-span-5 flex flex-col items-center">
              <img
                className={classes.teacherAvatar} 
                src="https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png"
                alt="teacher_avatar"
              />
              <p>Galvenais Pasniedzējs</p>
            </div>
          </div>
          <p className="text-xl mt-10">KURSI</p>
          <hr className="border-gray-200 my-2"/>
          {courseData.map((course, index) => (
              <div key={index} className={classes.coursesContainer}>
                <p>{course.code}</p>
                <p
                  className="hover:underline cursor-pointer"
                  onClick={() => props.onCourseClick && props.onCourseClick(course.name)}>
                  {course.name}
                </p>
              </div>
            ))}
        </div>
        <div className="flex p-4 flex-col items-center col-span-1 w-full h-full bg-gray-100">
          <CustomCalendar />
          <hr className="border-gray-200 my-2 w-full"/>
          <div className="w-full">
            <p className="text-l">ŠODIEN</p>
            <div className={classes.scheduleContainer}>
              <p className="break-words">Politoloģija</p>
              <p className="text-right">12.00</p>
            </div>
          </div>
          <hr className="border-gray-200 my-2 w-full"/>
          <div className="w-full">
            <p className="text-l">RĪT</p>
            <div className={classes.scheduleContainer}>
              <p className="break-words">Lietišķo datorsistēmu programmatūra</p>
              <p className="text-right">12.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherView
