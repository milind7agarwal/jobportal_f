import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import store from "../../redux/store";

const Login = () => {
   const [input, setInput] = useState({
      email: "",
      password: "",
    });
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
    finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar> </Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
              <form
                onSubmit={submitHandler}
                className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
              >
                <h1 className="font-bold text-xl mb-5 text-center text-blue-600">
                  Login
                </h1>
                <div className="my-2">
                  <Label className="text-gray-700 mb-2">Email</Label>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="johndoe@gmail.com"
                  ></Input>
                </div>
                <div className="my-2">
                  <Label className="text-gray-700 mb-2">Password</Label>
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="********"
                  ></Input>
                </div>
                <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5 ">
               <div className="flex items-center space-x-2">
                 <Input
                   type="radio"
                   name="role"
                   value="jobseeker"
                   checked={input.role === "jobseeker"}
                   onChange={changeEventHandler}
                   className="cursor-pointer"
                 />
                 <Label htmlFor="r1">jobseeker</Label>
               </div>
               <div className="flex items-center space-x-2">
                 <Input
                   type="radio"
                   name="role"
                   value="employer"
                   checked={input.role === "employer"}
                   onChange={changeEventHandler}
                   className="cursor-pointer"
                 />
                 <Label htmlFor="r2">employer</Label>
               </div>
            </RadioGroup>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center my-10">
                    <div className="spinner-border text-blue-600" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="block w-full py-3 my-3 text-white bg-primary hover:bg-primary/90 rounded-md"
                  >
                    Login
                  </button>
                )} 
                <p className="text-gray-500 text-md my-2">
                  Doesn't have an account?{" "}
                  <Link to="/register" className="text-blue-700 font-semibold">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
    </div>
  )
}

export default Login
