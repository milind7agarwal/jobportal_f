import { Button } from "@/components/ui/button"
import Navbar from "@/components/components_lite/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Home from "./components/components_lite/Home"
import { Toaster } from "./components/ui/sonner"
import { Provider } from "react-redux"
import store from "./redux/store"
//import ResumeAI from "./pages/ResumeAI"

const appRouter = createBrowserRouter([
  {path: "/", element: <Home />},
  //{path: "/resume-ai", element: <ResumeAI />},
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
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
