// src/layouts/DashboardLayout.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LOGO_MOKA from "../assets/final-20.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import "../styles/global.css";
import { sidebarItem } from "../constant/sidebar";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const location = useLocation()
  const segment = location.pathname.split('/')[1];

  
    const getOpenAccordionValue = () => {
      for (let groupIndex = 0; groupIndex < sidebarItem.length; groupIndex++) {
        const group = sidebarItem[groupIndex];
        for (let itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
          const item = group.items[itemIndex];
          if (item.active?.includes(segment)) {
            return `item-${groupIndex}-${itemIndex}`;
          }
        }
      }
    };
    const defaultValue = getOpenAccordionValue();
    
    
 
  

  return (
    
    <aside className="app-aside w-60 bg-[#111c43] h-full fixed top-0">
      <div className="main-slidebar-header w-60 p-3.5 fixed z-10 h-14 text-center border-solid border-b border-[rgba(255,255,255,0.1)]">
        <Link to="/" className="inline-block">
          <img className="h-10" src={LOGO_MOKA}></img>
        </Link>
      </div>
      <div className="main-slidebar mt-14">
        {sidebarItem &&
          sidebarItem.map((group, index) => (
            <div key={index}>
              <div className="menu-category px-6 py-3 text-[#a3aed1] text-xs tracking-wider font-semibold opacity-50">
                {group.label}
              </div>
              <Accordion
                type="single"
                collapsible
                className="px-3 sildebar-accordion"
                defaultValue={defaultValue}
              >
                {group.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`} className="mb-1">
                    <AccordionTrigger className={`rounded-lg px-2 text-[#a3aed1] ${item.active?.includes(segment) ? 'bg-[rgba(255,255,255,0.05)] text-white' : ''}`} >

                      <div>
                        {item.icon}&nbsp;&nbsp;
                        <span>{item.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border-0 mt-1">
                      <ul>
                        {item.links.map((link, linkIndex)=>(
                          <li className="pl-6" key={linkIndex}>
                          <Link
                            className="sibe-menu__item block relative hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)]"
                            to={link.to}
                          >
                             {link.title}
                            <span className="absolute  left-2 top-[40%] transform translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white "></span>
                          </Link>
                        </li>
                        ))}
                
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

       

      </div>
      <div className="main-slidebar-footer w-60 p-3.5 fixed z-10 h-14 text-center border-solid border-t border-[rgba(255,255,255,0.1)]">
        <div
          onClick={handleLogout}
          className="menu-category px-6  text-[#a3aed1] text-xs tracking-wider font-semibold opacity-50 cursor-pointer"
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          &nbsp;&nbsp;LOGOUT
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
