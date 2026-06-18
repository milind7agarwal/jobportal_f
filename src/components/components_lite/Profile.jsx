import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJobs from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto my-4 sm:my-8 px-3 sm:px-6 space-y-4 sm:space-y-6">
        <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
              <Avatar className="w-20 h-20 sm:w-28 sm:h-28 shrink-0">
                <AvatarImage src={user?.profile?.profilePicture} alt={user?.fullname} />
              </Avatar>
              <div className="text-center sm:text-left flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-1 truncate">{user?.fullname}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{user?.profile?.bio || "No bio added yet."}</p>
              </div>
            </div>
            <Button className="w-full sm:w-auto sm:self-end flex items-center justify-center gap-2" variant="outline" onClick={() => setOpen(true)}>
              <Pen className="w-4 h-4" /> Edit Profile
            </Button>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2 text-gray-700 min-w-0">
              <Mail className="w-4 h-4 shrink-0" />
              <a href={`mailto:${user?.email}`} className="text-blue-500 hover:underline text-sm truncate">
                {user?.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Contact className="w-4 h-4 shrink-0" />
              <span className="text-sm">{user?.phoneNumber || "—"}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((item, index) => (
                  <Badge key={index} className="text-xs">{item}</Badge>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No skills added yet.</span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3">Resume</h3>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="text-green-600 font-medium hover:underline text-sm"
              >
                Download Resume
              </a>
            ) : (
              <span className="text-red-600 font-medium text-sm">No resume uploaded</span>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Applied Jobs</h3>
          <AppliedJobs />
        </div>
      </div>

      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
