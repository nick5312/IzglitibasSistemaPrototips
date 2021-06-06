
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

const useStyles = createUseStyles({
  mainContainer: {
    display: "grid",
    gridTemplateRows: "50px auto"
  }
})

const ComponentEditorSideBar = (props) => {  
  switch (props.component.type) {
    case "HEADING": return (
      <div className="w-full">
        <p className="text-l">MAINĪT ELEMENTU</p>
        <hr className="border-gray-200 my-2"/>
        <input
          className="border border-gray-400 p-1 w-full" 
          type="text" 
          id="value"
          value={props.component.value} 
          onChange={props.onComponentValueChange}/>
        <span>
          <button
            className="my-2 w-20 px-2 bg-gray-400 hover:bg-gray-500 text-white"
            onClick={() => props.onComponentDelete && props.onComponentDelete()}>Dzēst</button>
        </span>
      </div>
    )
    case "TEXT": return (
      <div className="w-full">
      <p className="text-l">MAINĪT ELEMENTU</p>
      <hr className="border-gray-200 my-2"/>
      <textarea
        className="border border-gray-400 p-1 resize-none h-40 w-full" 
        id="value"
        value={props.component.value} 
        onChange={props.onComponentValueChange}
        />
        <span>
          <button 
            className="my-2 w-20 px-2 bg-gray-400 hover:bg-gray-500 text-white"
            onClick={() => props.onComponentDelete && props.onComponentDelete()}>Dzēst</button>
        </span>
    </div>
    )
    default: return <div></div>
  }
}

const ComponentRenderer = (props) => {
  switch (props.component.type) {
    case "HEADING": return <p className="text-3xl font-bold pb-2">{props.component.value}</p>
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

const DefaultSideBar = () => {
  return (
    <div className="w-full">
      <p className="text-l">STUDENTI</p>
    </div>
  )
}

const ComponentSideBar = (props) => {
  const components = [{
    name: "Virsraksts",
    type: "HEADING"
  }, {
    name: "Teksts",
    type: "TEXT"
  }]

  return (
    <div className="w-full">
      <p className="text-l">PIEVIENOT ELEMENTU</p>
      <hr className="border-gray-200 my-2"/>
      {components.map((value, index) => (
        <div 
          key={index} 
          className="w-full hover:bg-gray-200 p-1 cursor-pointer"
          onClick={() => props.onComponentAdd && props.onComponentAdd(value.type)}>
          <p>{value.name}</p>
        </div>
      ))}
    </div>
  )
}

const CourseEdit = (props) => {
  const classes = useStyles()
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(-1)
  const [courseComponents, setCourseComponents] = useState([])
  const [editMode, setEditMode] = useState(false)

  const onComponentValueChange = (e) => {
    let components = [...courseComponents]
    let component = {...components[selectedComponentIndex]}
    component.value = e.target.value;
    components[selectedComponentIndex] = component
    setCourseComponents(components)
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

  const onEditButtonClick = () => {
    if (editMode) {
      setSelectedComponentIndex(-1)
      fetch("/course", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          course: props.courseName,
          data: courseComponents
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error()
          }
        })
        .catch(_ => alert("Failed to update components!"))
    }

    setEditMode(!editMode)
  }

  const onComponentAdd = (type) => {
    const newComponent = {
      type,
      value: "Pagaidu teksts"
    }

    setCourseComponents([...courseComponents, newComponent])
  }

  const onComponentDelete = () => {
    let components = [...courseComponents]
    components.splice(selectedComponentIndex, 1)
    setCourseComponents(components)
    setSelectedComponentIndex(-1)
  }

  const onComponentClick = (index) => {
    setSelectedComponentIndex(index === selectedComponentIndex ? -1 : index)
  }

  const onComponentDragEnd = (e) => {
    if (!e.destination) {
      return
    }
    
    let components = [...courseComponents]
    const [reorderedComponents] = components.splice(e.source.index, 1)
    components.splice(e.destination.index, 0, reorderedComponents)
    setCourseComponents(components)

    if (e.source.index === selectedComponentIndex) {
      setSelectedComponentIndex(e.destination.index)
    } else if (e.destination.index === selectedComponentIndex) {
      setSelectedComponentIndex(e.source.index)
    } else if (e.destination.index > selectedComponentIndex && selectedComponentIndex !== -1) {
      setSelectedComponentIndex(selectedComponentIndex - 1)
    } else if (e.destination.index < selectedComponentIndex && selectedComponentIndex !== -1) {
      setSelectedComponentIndex(selectedComponentIndex + 1)
    }
  }

  const renderSideBar = () => {
    if (selectedComponentIndex === -1) {
      return editMode ? <ComponentSideBar onComponentAdd={onComponentAdd}/> : <DefaultSideBar />
    } else {
      const selectedComponent = courseComponents[selectedComponentIndex]
      return (
        <ComponentEditorSideBar 
          component={selectedComponent} 
          onComponentValueChange={onComponentValueChange}
          onComponentDelete={onComponentDelete}
        />
      )
    }
  }
  
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
            <div className="grid grid-cols-2">
              <p className="text-xl">{props.courseName}</p>
              <span className="flex justify-end">
                <button
                  className="h-full w-20 px-2 bg-gray-400 hover:bg-gray-500 text-white"
                  onClick={onEditButtonClick}>
                  {editMode ? "Saglabāt" : "Mainīt"}
                </button>
              </span>
            </div>
            <hr className="border-gray-200 my-2"/>
            {editMode ? (
              <DragDropContext onDragEnd={onComponentDragEnd}>
              <Droppable droppableId="components">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {courseComponents.map((component, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            key={index}
                            className={`hover:bg-gray-200 cursor-pointer ${index === selectedComponentIndex && "bg-gray-200"} ${component.value === "" && "py-3"}`} 
                            onClick={() => onComponentClick(index)}>
                            <ComponentRenderer component={component}/>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>) : (
              courseComponents.map((component, index) => <ComponentRenderer key={index} component={component}/>)
            )}
        </div>
        <div className="flex p-4 flex-col items-center col-span-1 w-full h-full bg-gray-100">
          {renderSideBar()}
        </div>
      </div>
    </div>
  )
}

export default CourseEdit
