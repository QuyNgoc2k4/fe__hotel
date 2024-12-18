import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LOGO_MOKA from "../assets/final-20.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import CustomDialog from "../components/ui/CustomDialog"; // Import CustomDialog
import "../styles/global.css";
import { sidebarItem } from "../constant/sidebar";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Quản lý trạng thái của hộp thoại

  const segment = location.pathname.split("/")[1];

  const handleLogout = () => {
    setIsDialogOpen(true); // Hiển thị hộp thoại
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsDialogOpen(false); // Đóng hộp thoại sau khi xác nhận
  };

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
    <>
      {/* Sidebar */}
      <aside
        className={`app-aside w-60 bg-[#111c43] h-full fixed top-0 z-[101] transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        <div className="main-slidebar-header w-60 p-3.5 fixed z-10 h-14 text-center border-solid border-b border-[rgba(255,255,255,0.1)]">
          <Link to="/" className="inline-block">
            <img className="h-10" src={LOGO_MOKA} alt="Logo" />
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
                    <AccordionItem
                      key={itemIndex}
                      value={`item-${index}-${itemIndex}`}
                      className="mb-1"
                    >
                      <AccordionTrigger
                        className={`rounded-lg px-2 text-[#a3aed1] ${
                          item.active?.includes(segment)
                            ? "bg-[rgba(255,255,255,0.05)] text-white"
                            : ""
                        } hover:bg-[rgba(255,255,255,0.05)] hover:text-white`}
                      >
                        <div>
                          {item.icon}&nbsp;&nbsp;
                          <span>{item.label}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-0 mt-1">
                        <ul>
                          {item.links.map((link, linkIndex) => (
                            <li className="pl-6" key={linkIndex}>
                              <Link
                                className="sibe-menu__item block relative hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)]"
                                to={link.to}
                              >
                                {link.title}
                                <span className="absolute left-2 top-[40%] transform translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white "></span>
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
            className="menu-category px-6 text-[#a3aed1] hover:text-white text-xs tracking-wider font-semibold opacity-50 cursor-pointer"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            &nbsp;&nbsp;ĐĂNG XUẤT
          </div>
        </div>
      </aside>

      {/* CustomDialog */}
      <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmLogout}
        title="Xác nhận đăng xuất"
        description="Bạn có chắc chắn muốn đăng xuất không?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
      />
    </>
  );
};

export default Sidebar;
