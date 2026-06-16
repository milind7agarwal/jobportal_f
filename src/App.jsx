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
import Companies from  "./components/admincomponent/Companies";
import CompanyCreate from "./components/admincomponent/CompanyCreate";
import CompanySetup from "./components/admincomponent/CompanySetup";
import AdminJobs from "./components/admincomponent/AdminJobs"
import PostJob from "./components/admincomponent/PostJob";
import Applicants from "./components/admincomponent/Applicants"
import Browse from "./components/components_lite/Browse"
import ProtectedRoute from "./components/admincomponent/ProtectedRoute"
//import ResumeAI from "./pages/ResumeAI"

const appRouter = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />}, 
  {path: "/Profile", element: <Profile />},
  {path: "/Jobs", element: <Jobs/>},
  {path: "/browse", element: <Browse/>},
  {path: "/description/:id", element: <Description/>},
  {path: "/admin/companies", element: <ProtectedRoute><Companies/></ProtectedRoute> },
  {path: "/admin/companies/create",element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>},
  {path: "/admin/companies/:id",element: <ProtectedRoute><CompanySetup/></ProtectedRoute>},
  {path: "/admin/jobs", element:<ProtectedRoute><AdminJobs/></ProtectedRoute> },
  {path: "/admin/jobs/create",element: <ProtectedRoute><PostJob /></ProtectedRoute>},
  { path: "/admin/jobs/:id/applicants", element: <ProtectedRoute><Applicants /></ProtectedRoute>}
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
