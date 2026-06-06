import { Button } from "@/components/ui/button"
import Navbar from "@/components/components_lite/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Home from "./components/components_lite/Home"
import Jobs from "./components/components_lite/Jobs"
import { Toaster } from "./components/ui/sonner"
import { Provider } from "react-redux"
import store from "./redux/store"
import Profile from "./components/components_lite/Profile"
import Description from "./components/components_lite/Description"

//import ResumeAI from "./pages/ResumeAI"

const appRouter = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />}, 
  {path: "/Profile", element: <Profile />},
  {path: "/Jobs", element: <Jobs/>},
  {path: "/description/:id", element: <Description/>},
])

function App() {
  return (
    <div >
      <Provider store={store}>
        <RouterProvider router={appRouter} />
        <Toaster></Toaster>
      </Provider>
    </div>
  )
}

export default App
