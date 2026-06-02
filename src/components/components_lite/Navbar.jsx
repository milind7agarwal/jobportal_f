import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
    const user = true;

  return (
    <div className="bg-white">
        <div className="container mx-auto flex items-center justify-between py-4">
            <div>
                <h1 className="text-black text-2xl font-bold">Job <span className="text-blue-500">Portal</span></h1>
            </div>
            <div className="flex items-center gap-6">
                <ul className="flex font-medium gap-4 text-gray-500">
                    <li> Home</li>
                    <li> <span className="text-rose-500">Resume AI</span></li>
                    <li>Browse</li>
                    <li>Job</li>
                </ul>
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
                            <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                        <div className= "flex items-center gap-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                            <h3>Milind Agrawal</h3>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Button variant="outline"><User2/>Profile </Button>
                            <Button variant="destructive"><LogOut/>Logout </Button>
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
