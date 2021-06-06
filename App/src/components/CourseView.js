import { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  mainContainer: {
    display: "grid",
    gridTemplateRows: "50px auto"
  }
})

const CourseView = (props) => {
  const classes = useStyles()
  const [courseComponents, setCourseComponents] = useState([])

  const ComponentRenderer = (props) => {
    switch (props.component.type) {
      case "HEADING": return <p className="text-3xl mb-1 font-bold">{props.component.value}</p>
      case "TEXT": return (
        <div>
          {props.component.value.split("\n").map((value, index) => {
            return <p key={index}>{value}</p>
          })}
        </div>
      )
      default: <p>Invalid component type!</p>
    }
  }

  useEffect(() => {
    let params = new URLSearchParams()
    params.append("course", props.courseName)

    fetch(`/course?${params.toString()}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(res => {
        setCourseComponents(JSON.parse(res.components)) 
      })
      .catch(_ => {})
  }, [props.courseName])

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
            <p className="text-xl">{props.courseName}</p>
            <hr className="border-gray-200 my-2"/>
            {courseComponents.map((component, index) => <ComponentRenderer key={index} component={component}/>)}
        </div>
        <div className="flex p-4 flex-col items-center col-span-1 w-full h-full bg-gray-100">
          <div className="w-full">
            <p className="text-l">VĒRTĒJUMI</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseView
