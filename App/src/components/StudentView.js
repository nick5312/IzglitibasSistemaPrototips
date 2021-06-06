import { createUseStyles } from 'react-jss'
import CustomCalendar from './Calendar';
import 'react-calendar/dist/Calendar.css';

const useStyles = createUseStyles({
  mainContainer: {
    display: "grid",
    gridTemplateRows: "50px auto"
  },
  scheduleContainer: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 60px"
  },
  coursesContainer: {
    display: "grid",
    gridTemplateColumns: "100px 200px minmax(0, 1fr)",
  },
  studentInfoContainer: {
    display: "grid",
    gridTemplateColumns: "150px repeat(2, minmax(0, 1fr))",
  },
  studentAvatar: {
    width: "100px",
    height: "100px",
    marginBottom: "5px"
  }
})

const StudentView = (props) => {
  const classes = useStyles()

  const courseData = [{
      code: "DIP321",
      teacher: "Galvenais Pasniedzējs",
      name: "Algoritmi un programmēšanas metodes"
    }, {
      code: "DIP001",
      teacher: "Galvenais Pasniedzējs",
      name: "Bakalaura Darbs"
    },{
      code: "DIP392",
      teacher: "Galvenais Pasniedzējs",
      name: "Lietišķo datorsistēmu programmatūra"
    },{
      code: "HSP378",
      teacher: "Galvenais Pasniedzējs",
      name: "Politoloģija"
    },{
      code: "DIP383",
      teacher: "Galvenais Pasniedzējs",
      name: "Programmatūras izstrādes tehnoloģija"
    }
  ]

  return (
    <div className="flex justify-center h-full w-full">
      <div className={`${classes.mainContainer} grid-cols-4 w-full 2xl:w-3/5`}>
        <div className="col-span-4 bg-gray-200 flex">
          <div className="px-3 h-full hover:bg-gray-300 flex flex-col justify-center cursor-pointer">
            <p>SĀKUMS</p>
          </div>
          <div 
            className="px-3 h-full hover:bg-gray-300 flex flex-col justify-center cursor-pointer"
            onClick={() => props.onExit && props.onExit()}>
            <p>IZIET</p>
          </div>
        </div>
        <div className="col-span-3 p-14 bg-gray-50">
          <div>
            <p className="text-xl">STUDENTS</p>
            <hr className="border-gray-200 my-2"/>
            <div className={classes.studentInfoContainer}>
              <div className="row-span-5 flex flex-col items-center">
                <img
                  className={classes.studentAvatar} 
                  src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                  alt="student_avatar"
                />
                <p>Mārcis Algoritms</p>
                <p>623RDP391</p>
              </div>
              <p>Struktūrvienība: 12300 Lietišķo datorsistēmu institūts</p>
              <p>Studiju programma: Datorsistēmas</p>
              <p>Studiju līmenis: Bakalaura akadēmiskās studijas</p>
              <p>Studiju vieta: Rīga</p>
              <p>Kurss: 3</p>
              <p>Grupa: 4</p>
              <p>Apmācību valoda: Latviešu</p>
            </div>
            <p className="text-xl mt-10">KURSI</p>
            <hr className="border-gray-200 my-2"/>
            {courseData.map((course, index) => (
              <div key={index} className={classes.coursesContainer}>
                <p>{course.code}</p>
                <p>{course.teacher}</p>
                <p
                  className="hover:underline cursor-pointer"
                  onClick={() => props.onCourseClick && props.onCourseClick(course.name)}>
                  {course.name}
                </p>
              </div>
            ))}
            <p className="text-xl mt-10">FINANSES</p>
            <hr className="border-gray-200 my-2"/>
            <p>Apmācību veids: Pilna laika klātienes</p>
            <p>Gada maksa: 300000</p>
          </div>
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
            <div className={classes.scheduleContainer}>
              <p className="break-words">Informātika</p>
              <p className="text-right">14.00</p>
            </div>
            <div className={classes.scheduleContainer}>
              <p className="break-words">Lietišķo datorsistēmu programmatūra</p>
              <p className="text-right">16.00</p>
            </div>
          </div>
          <hr className="border-gray-200 my-2 w-full"/>
          <div className="w-full">
            <p className="text-l">RĪT</p>
            <div className={classes.scheduleContainer}>
              <p className="break-words">Investīcijas</p>
              <p className="text-right">10.00</p>
            </div>
            <div className={classes.scheduleContainer}>
              <p className="break-words">Informātika</p>
              <p className="text-right">12.00</p>
            </div>
            <div className={classes.scheduleContainer}>
              <p className="break-words">Algoritmi un programmēšanas metodes</p>
              <p className="text-right">14.00</p>
            </div>
            <div className={classes.scheduleContainer}>
              <p className="break-words">Programmatūras izstrādes tehnoloģija</p>
              <p className="text-right">16.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentView
