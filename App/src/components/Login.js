import { useState } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
  loginContainer: {
    width: "450px",
    height: "350px",
    marginTop: "5%",
    padding: "40px"
  },
  buttonWrapper: {
    marginTop: "auto"
  }
})

const Login = (props) => {
  const classes = useStyles()
  const [currentUsername, setCurrentUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [errorState, setErrorState] = useState(false)

  const users = [{
    username: "st1",
    password: "parole",
    role: "STUDENT"
  }, {
    username: "te1",
    password: "parole",
    role: "TEACHER"
  }]

  const onLoginAttempt = () => {
    let loginSuccessful = false;
    for (const user of users) {
      if (user.username === currentUsername && user.password === currentPassword) {
        props.onLogin && props.onLogin(user)
        loginSuccessful = true
      }
    }
    
    if (!loginSuccessful) {
      setErrorState(true)
    }

    // fetch("login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     username: currentUsername,
    //     password: currentPassword
    //   })
    // })
    // .then(res => {
    //   if (res.ok) {
    //     return res.json()
    //   } else {
    //     throw new Error()
    //   }
    // })
    // .then(data => props.onLogin && props.onLogin(data))
    // .catch(_ => setErrorState(true))
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className={`${classes.loginContainer} bg-gray-100 h-full flex flex-col`}>
        <label className="block text-xl" htmlFor="username">Lietotājvārds</label>
        <input 
          className="border border-gray-400 p-3 w-full my-3" 
          type="text" 
          id="username"
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
        />
        <label className="block text-xl" htmlFor="password">Parole</label>
        <input
          className="border border-gray-400 p-3 w-full my-3" 
          type="password" 
          id="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {errorState && <p className="text-sm text-red-500">Nepareizs lietotājvārds vai parole</p>}
        <span className={`${classes.buttonWrapper} self-end`}>
          <button className="p-2 bg-gray-400 text-white hover:bg-gray-500" onClick={onLoginAttempt}>Pievienoties</button>
        </span>
      </div>
    </div>
  )
}

export default Login
