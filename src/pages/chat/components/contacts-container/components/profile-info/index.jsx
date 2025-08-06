import React from "react";
import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar";
import { useAppStore } from "../../../../../../store";
import { SERVER_URL } from "../../../../../../utils/constants";
import { getColor } from "../../../../../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../../components/ui/tooltip";
import { MdModeEdit } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { axiosInstance, getConfig } from "../../../../../../utils/request";
import { LOGOUT } from "../../../../../../lib/api-client";
const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const logout = async () => {
    try {
      await getConfig();
      const response = await axiosInstance.post(
        LOGOUT,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33] ">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className=" h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${SERVER_URL}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black border-2"
              />
            ) : (
              <div
                className={`uppercase w-12 h-12 text-lg border-[1px] flex items-center justify-center ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName}`
            : "User"}
        </div>
      </div>
      <div className="flex gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MdModeEdit
                className="text-purple-500 text-xl font-medium cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CgLogOut
                className="text-red-700 text-xl font-medium cursor-pointer"
                onClick={logout}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
