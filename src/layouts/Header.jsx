import { RiMenu2Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { CiGrid41 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsFullscreenExit } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
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

const Header = () => {
  return (
    <header className="app-header h-14 fixed w-full content-center items-center top-0 bg-white">
      <div className="main-header mx-auto h-full flex items-center justify-between">
        <RiMenu2Fill className="text-[30px] cursor-pointer" />
        <div className="header-right-content flex justify-between items-center">
          <div className="header-search">
            <IoIosSearch className="text-xl cursor-pointer" />
          </div>

          <div className="notification-dropdown">
            <Link to="/" className="header-link flex relative">
              <GoBell className="cursor-pointer header-link-icon " />
              <span className="badge-bell absolute  w-[14px] h-[15px] text-center rounded-full text-white">
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
            <DropdownMenu >
              <DropdownMenuTrigger className="flex">
                <Avatar className="mr-3">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="profile-content text-left">
                    <div className="font-semibold">Quy Nguyen</div>
                    <div className="role text-xs text-[#536485]">Administrator</div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[#333335] cursor-pointer">
                  <CgProfile />
                  Profile
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
