import { useState } from "react"
import Login from "./components/Login"
import StudentApp from "./components/StudentApp"
import TeacherApp from "./components/TeacherApp"

const App = () => {
  const [userData, setUserData] = useState({})

  const UserView = () => {
    const appProps = {
      onExit: () => setUserData({})
    }

    switch (userData.role) {
      case "STUDENT": return <StudentApp { ...appProps }/>
      case "TEACHER": return <TeacherApp { ...appProps }/>
      default: <p>Invalid user view state!</p>
    }
  }

  return (
    <div className="w-full h-full">
      {Object.keys(userData).length === 0 ? 
        <Login onLogin={(data) => setUserData(data)}/> :
        <UserView />
      }
    </div>
  )
}

export default App;
