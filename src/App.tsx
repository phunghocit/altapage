import { useContext, useEffect } from 'react'
  import { Routes , Route, useNavigate } from 'react-router-dom'
  // import { AuthContext } from './context/auth-context'
  import Login from './pages/Login'
//   import Dashboard from './pages/Dashboard'
// import RegisterFormUser from './components/RegisterFormUser'
// import Device from './pages/Device'

  function App() {
    // const { currentUser } = useContext(AuthContext)
    // const navigate = useNavigate()

    // NOTE: console log for testing purposes
    // console.log('User:', !!currentUser);

    // Check if the current user exists on the initial render.
    // useEffect(() => {
    //   if (currentUser) {
    //     navigate('/Dashboard')
    //   }
    // }, [currentUser])
    
    return (
      // <Routes>
      //   <Route index element={<Login />} />
      //   <Route path="Dashboard" element={currentUser ? <Dashboard />: <Login />} />
      //   {/* <Route path="Device" element={currentUser ? <Dashboard />: <Device />} /> */}
      // </Routes>
      <Login/>
    )
  }

  export default App