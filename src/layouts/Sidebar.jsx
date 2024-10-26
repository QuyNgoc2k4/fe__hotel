// src/layouts/DashboardLayout.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LOGO_MOKA from "../assets/final-20.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import "../styles/global.css";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
 
    <aside className="app-aside w-60 bg-[#111c43] h-full fixed">
      <div className="main-slidebar-header w-60 p-3.5 fixed z-10 h-14 text-center border-solid border-b border-[rgba(255,255,255,0.1)]">
        <Link to="/" className="inline-block">
          <img className="h-10" src={LOGO_MOKA}></img>
        </Link>
      </div>
      <div className="main-slidebar mt-14">
         <div className="menu-category px-6 py-3 text-[#a3aed1] text-xs tracking-wider font-semibold opacity-50">MAIN</div>
        <Accordion type="single" collapsible className="px-3 sildebar-accordion">
          <AccordionItem value="item-1" className="  ">
            <AccordionTrigger className="rounded-lg text-[#a3aed1]  bg-[rgba(255,255,255,0.05)] px-2">
            
               <span><i class="fa-solid fa-chart-line"></i>&nbsp;&nbsp;Dashboard</span>
            </AccordionTrigger>
            <AccordionContent className="border-0 mt-1">
              <ul>
               <li className="pl-6">
                  <Link className="sibe-menu__item block relative hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)]" to="/dashboard">
                     
                  Thống kê doanh thu
                  <span className="absolute  left-2 top-[40%] transform translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white "></span>
                  </Link>
               </li>
               <li className="pl-6">
                  <Link className="sibe-menu__item block relative hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)]" to="">
                     
                  Thống kê doanh khách hàng
                  <span className="absolute  left-2 top-[40%] transform translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white "></span>
                  </Link>
               </li>
               
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="menu-category px-6 py-3 text-[#a3aed1] text-xs tracking-wider font-semibold opacity-50">MANAGEMENT</div>
        <Accordion type="single" collapsible className="px-3 sildebar-accordion">
          <AccordionItem value="item-2" className="px-2">
            <AccordionTrigger className="text-[#a3aed1]">
            
               <span><i class="fa-solid fa-users-gear"></i>&nbsp;&nbsp;User management</span>
            </AccordionTrigger>
            <AccordionContent className="border-0 mt-1">
              <ul>
               <li className="pl-6">
                  <Link className="sibe-menu__item block relative hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)]" to="">
                     
                  Quản lý tài khoản
                  <span className="absolute  left-2 top-[40%] transform translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white "></span>
                  </Link>
               </li>
               <li className="pl-6">
                  <Link className="sibe-menu__item block relative hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)]" to="">
                     
                  Quản lý quyền
                  <span className="absolute  left-2 top-[40%] transform translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white "></span>
                  </Link>
               </li>
               
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="px-3 sildebar-accordion">
          <AccordionItem value="item-1" className="rounded-lg px-2">
            <AccordionTrigger className="text-[#a3aed1]">
            
               <span><i class="fa-solid fa-hotel"></i>&nbsp;&nbsp;Hotel management</span>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="px-3 sildebar-accordion">
          <AccordionItem value="item-1" className="rounded-lg px-2">
            <AccordionTrigger className="text-[#a3aed1]">
            
               <span><i class="fa-brands fa-buromobelexperte"></i>&nbsp;&nbsp;Room management</span>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        
      </div>
      <div className="main-slidebar-footer w-60 p-3.5 fixed z-10 h-14 text-center border-solid border-t border-[rgba(255,255,255,0.1)]">
        <div onClick={handleLogout} className="menu-category px-6  text-[#a3aed1] text-xs tracking-wider font-semibold opacity-50 cursor-pointer">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
           &nbsp;&nbsp;LOGOUT
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
