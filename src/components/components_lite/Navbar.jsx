import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { LogOut, User2 } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "sonner";
import axios from "axios"; // Import axios
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";


const Navbar = () => {
    const {user} = useSelector((store) => store.auth); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
        const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
            withCredentials: true,
        });
        if (res && res.data && res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        } else {
            console.error("Error logging out:", res.data);
        }
        } catch (error) {
        console.error("Axios error:", error);
        if (error.response) {
            console.error("Error response:", error.response.data);
        }
        toast.error("Error logging out. Please try again.");
        }
    };
  return (
    <div className="bg-white">
        <div className="container mx-auto flex items-center justify-between py-4">
            <div>
                <h1 className="text-black text-2xl font-bold">Job <span className="text-blue-500">Portal</span></h1>
            </div>
            <div className="flex items-center gap-6">
                <ul className="flex font-medium gap-4 text-gray-500">
                    {user && user.role === "employer" ? (
                        <>
                            <li>
                            <Link to={"/admin/companies"}>Companies</Link>
                            </li>
                            <li>
                            <Link to={"/admin/jobs"}>Jobs</Link>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                            {" "}
                            <Link to={"/"}> Home</Link>  
                            </li>
                            <li>
                            {" "}
                            <li> <span className="text-rose-500">Resume AI</span></li>
                            </li>
                            <li>
                            {" "}
                            <Link to= {"/Jobs"}>Job</Link>
                            </li>
                        </>
                        )}
                    </ul>
                    {/* <Link to={"/"}> Home</Link>  
                    <li> <span className="text-rose-500">Resume AI</span></li>
                    <Link to= {"/Jobs"}>Job</Link>
                </ul> */}
                {!user ? (
                    <div className="flex items-center gap-4"> 
                        <Link to="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button className="bg-blue-500 text-white hover:bg-blue-600">Sign Up</Button>
                        </Link>
                    </div>
                ) : (
                    <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={user?.profile?.profilePicture} alt="https://github.com/shadcn.png" />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                        <div className= "flex items-center gap-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={user?.profile?.profilePicture} alt="https://github.com/shadcn.png" />
                            </Avatar>
                            <h3>{user?.fullname}</h3>
                        </div>
                        <div className="flex flex-col gap-1">
                        {user && user.role === "jobseeker" && (
                            <Link to="/Profile"> <Button variant="outline" className="w-full justify-start gap-2"><User2/>Profile</Button></Link> 
                        )}
                            <Button variant="destructive" className="w-full justify-start gap-2" onClick={logoutHandler}><LogOut/>Logout </Button>
                        </div>
                    </PopoverContent>
                </Popover>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar
