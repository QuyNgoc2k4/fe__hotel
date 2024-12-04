import React from "react";
import { RiMenu2Fill, RiMenu3Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { CiGrid41 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsFullscreenExit } from "react-icons/bs";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

import { Link } from "react-router-dom";

const Header = ({
  toggleSidebar,
  isSidebarOpen,
  userInfo = {
    avatar_url: "",
    name: "User Name",
    Admins: [], // Default Admins array
  },
}) => {
  const { avatar_url, name, Admins } = userInfo;

  // Extract management_level if it exists in Admins array
  const management_level =
    Admins?.length > 0 ? Admins[0].management_level : "No Level Assigned";

  return (
    <header
      className={`app-header ${
        isSidebarOpen ? "" : "sidebar-hidden"
      } fixed w-full content-center items-center top-0 bg-white z-[100]`}
    >
      <div className="main-header mx-auto h-full flex items-center justify-between px-4">
        {/* Sidebar Toggle Icon */}
        {isSidebarOpen ? (
          <RiMenu3Fill
            className="text-[30px] cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <RiMenu2Fill
            className="text-[30px] cursor-pointer"
            onClick={toggleSidebar}
          />
        )}

        {/* Rest of Header Content */}
        <div className="header-right-content flex justify-between items-center">
          <div className="header-search">
            <IoIosSearch className="text-xl cursor-pointer" />
          </div>

          <div className="notification-dropdown">
            <Link to="/" className="header-link flex relative">
              <GoBell className="cursor-pointer header-link-icon " />
              <span className="badge-bell absolute w-[14px] h-[15px] text-center rounded-full text-white">
                5
              </span>
            </Link>
          </div>
          <div className="shortcut-dropdown">
            <Link to="/" className="header-link flex ">
              <CiGrid41 className="cursor-pointer header-link-icon" />
            </Link>
          </div>
          <div className="shortcut-dropdown">
            <Link to="/" className="header-link flex">
              <BsFullscreenExit className="cursor-pointer header-link-icon" />
            </Link>
          </div>
          <div className="profile">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex">
                <Avatar className="mr-3">
                  <AvatarImage src={avatar_url} alt={`${name}'s avatar`} />
                  <AvatarFallback>{name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="profile-content text-left">
                  <div className="font-semibold">{name || "Unknown User"}</div>
                  <div className="role text-xs text-[#536485]">
                    {management_level}
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel className="border-b border-solid border-[#f3f3f3]">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[#333335] cursor-pointer">
                  <Link to="/profile" className="flex items-center">
                    <CgProfile className="mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#333335] cursor-pointer">
                  <IoExitOutline />
                  Inbox
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#333335] cursor-pointer">
                  <IoIosHelpCircleOutline />
                  Help
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#333335] cursor-pointer">
                  <IoSettingsOutline /> Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
