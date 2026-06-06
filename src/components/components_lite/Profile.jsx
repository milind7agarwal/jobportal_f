import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJobs from "./AppliedJob";

const skill = ["JavaScript", "React", "Node.js", "Express", "MongoDB", "HTML", "CSS"];
const isResume = true;
const Profile = () => {
  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto my-10 p-4 border border-gray-300 rounded-md">
            <div className="flex justify-between">
                <div className="flex items-center gap-6 mb-6">            
                    <Avatar className="w-32 h-32 mb-4">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Milind Agrawal</h2>
                        <p className="text-gray-600 mb-4">A passionate software developer with experience in building web applications using modern technologies. Skilled in JavaScript, React, and Node.js.</p>
                    </div>
                    <Button className="text-right" variant="outline"><Pen/> Edit Profile</Button>
                </div>

            </div>
                <div className="flex items-center gap-4">
                    <Mail/>
                    <span>milind@example.com</span>

                    <Contact/>
                    <span>+1 234 567 890</span>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mt-6 mb-2">Skills</h3>
                    <div className="flex items-center gap-2 mb-4">
                    {
                        skill.length !==0 ? skill.map((item, index) => (
                            <Badge key={index} className="mr-2 mb-2 text-sm">{item}</Badge>
                        )): <spam className="text-gray-500">No skills added yet.</spam>
                    }
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mt-6 mb-2">Resume</h3>
                    <div>
                        {isResume ? <a target = "_blank" href={"http://resume.com"} download="resume.pdf" className="text-green-600 font-medium hover:underline cursor-pointer">Download Resume</a> : (
                            <div className="flex items-center gap-4">
                                <span className="text-red-600 font-medium">No resume uploaded</span>
                                <Button variant="outline" size="sm"><Pen/> Upload Resume</Button>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mt-6 mb-2">Applied Jobs</h3>
                    <AppliedJobs/>
                </div>
        </div>
    </div>
  );
};

export default Profile;