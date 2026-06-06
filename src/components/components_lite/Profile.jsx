import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJobs from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";

const skill = ["JavaScript", "React", "Node.js", "Express", "MongoDB", "HTML", "CSS"];
const isResume = false;

const Profile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-7xl mx-auto my-5 md:my-10 p-4 border border-gray-300 rounded-md">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Milind Agrawal</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                A passionate software developer with experience in building web applications using modern technologies. Skilled in JavaScript, React, and Node.js.
              </p>
            </div>
          </div>
          <Button className="w-full md:w-auto flex items-center justify-center gap-2" variant="outline" onClick={() => setOpen(true)}>
            <Pen className="w-4 h-4" /> Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-5 h-5" />
            <span className="text-sm sm:text-base">milind@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Contact className="w-5 h-5" />
            <span className="text-sm sm:text-base">+1 234 567 890</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Skills</h3>
          <div className="flex flex-wrap items-center gap-2">
            {skill.length !== 0 ? (
              skill.map((item, index) => (
                <Badge key={index} className="text-xs sm:text-sm">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No skills added yet.</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Resume</h3>
          <div>
            {isResume ? (
              <a
                target="_blank"
                href={"http://resume.com"}
                download="resume.pdf"
                className="text-green-600 font-medium hover:underline cursor-pointer text-sm sm:text-base"
              >
                Download Resume
              </a>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-red-600 font-medium text-sm sm:text-base">No resume uploaded</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-7xl mx-auto my-5 md:my-10 p-4 border border-gray-300 rounded-md">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Applied Jobs</h3>
        <div className="overflow-x-auto">
           {/* Wrapped AppliedJobs in a container with overflow-x-auto so the table inside doesn't break mobile width */}
          <AppliedJobs />
        </div>
         <EditProfileModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;