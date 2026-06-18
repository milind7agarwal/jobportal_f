import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
                withCredentials: true,
            });
            if (res && res.data && res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
                setMobileOpen(false);
            } else {
                console.error("Error logging out:", res.data);
            }
        } catch (error) {
            console.error("Axios error:", error);
            toast.error("Error logging out. Please try again.");
        }
    };

    const jobseekerLinks = (
        <>
            <Link to="/" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/ai" className="block py-2 text-rose-500 font-medium" onClick={() => setMobileOpen(false)}>Resume AI</Link>
            {user && (
                <Link to="/ai/reports" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>My Reports</Link>
            )}
            <Link to="/Jobs" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Jobs</Link>
        </>
    );

    const employerLinks = (
        <>
            <Link to="/admin/companies" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Companies</Link>
            <Link to="/admin/jobs" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Jobs</Link>
        </>
    );

    return (
        <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
                <Link to="/" className="shrink-0">
                    <h1 className="text-black text-xl sm:text-2xl font-bold">Job <span className="text-blue-500">Portal</span></h1>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    <ul className="flex font-medium gap-4 text-gray-500 text-sm">
                        {user && user.role === "employer" ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/ai" className="text-rose-500">Resume AI</Link></li>
                                {user && <li><Link to="/ai/reports">My Reports</Link></li>}
                                <li><Link to="/Jobs">Jobs</Link></li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
                            <Link to="/register"><Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">Sign Up</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer h-9 w-9">
                                    <AvatarImage src={user?.profile?.profilePicture} alt={user?.fullname} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-44">
                                <div className="flex items-center gap-2 mb-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.profile?.profilePicture} alt={user?.fullname} />
                                    </Avatar>
                                    <h3 className="text-sm font-medium truncate">{user?.fullname}</h3>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {user?.role === "jobseeker" && (
                                        <Link to="/Profile">
                                            <Button variant="outline" className="w-full justify-start gap-2" size="sm"><User2 className="w-4 h-4" />Profile</Button>
                                        </Link>
                                    )}
                                    <Button variant="destructive" className="w-full justify-start gap-2" size="sm" onClick={logoutHandler}>
                                        <LogOut className="w-4 h-4" />Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                    onClick={() => setMobileOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
                    <nav className="space-y-1 text-sm font-medium">
                        {user && user.role === "employer" ? employerLinks : jobseekerLinks}
                    </nav>
                    <div className="pt-3 border-t border-slate-100">
                        {!user ? (
                            <div className="flex flex-col gap-2">
                                <Link to="/login" onClick={() => setMobileOpen(false)}>
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link to="/register" onClick={() => setMobileOpen(false)}>
                                    <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">Sign Up</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 pb-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.profile?.profilePicture} alt={user?.fullname} />
                                    </Avatar>
                                    <span className="text-sm font-medium text-slate-800">{user?.fullname}</span>
                                </div>
                                {user?.role === "jobseeker" && (
                                    <Link to="/Profile" onClick={() => setMobileOpen(false)}>
                                        <Button variant="outline" className="w-full justify-start gap-2" size="sm"><User2 className="w-4 h-4" />Profile</Button>
                                    </Link>
                                )}
                                <Button variant="destructive" className="w-full justify-start gap-2" size="sm" onClick={logoutHandler}>
                                    <LogOut className="w-4 h-4" />Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
