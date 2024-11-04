// src/components/ui/filter.js

import { Link } from 'react-router-dom';
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { Input } from "./input";

import { MdDeleteForever } from "react-icons/md";
import { perpages } from "../../constant/general";
import { FaPlus } from "react-icons/fa6";
import { FilterProps } from "../../interfaces/BaseServiceInterface";
import  useFilterAction  from "../../hook/useFilterAction";

const Filter = ({ isAnyChecked, checkedState }: FilterProps) => {

    const {actionSwitch} = useFilterAction();

 
   const handleStatus = (value : string): void => {
    const [action, SelectedValue] = value.split('|');

    actionSwitch(action, SelectedValue, checkedState);

      
   }

  return (
    <div className="flex justify-between mb-[15px] items-center">
      <div className="flex items-center">
        <div className="mr-[10px]">
            {isAnyChecked && (
                 <Select onValueChange={(value) => handleStatus(value)}>
                 <SelectTrigger className="w-[180px]">
                   <SelectValue placeholder="With selected" />
                 </SelectTrigger>
                 <SelectContent className="bg-white">
                   <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="deleteAll">
                     <div className="flex items-center">
                       <MdDeleteForever />
                       Delete All
                     </div>
                   </SelectItem>
                   <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="publish|1">1</SelectItem>
                   <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="publish|2">2</SelectItem>
                 </SelectContent>
               </Select>
            ) }
 
        </div>
        <div className="mr-[10px]">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select number of records" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {perpages && perpages.map((perpage, index) => (
                <SelectItem key={index} className="cursor-pointer hover:bg-[#a3aed17c]" value={perpage}>
                  {perpage} bản ghi
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mr-[10px]">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select roles" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="0">Customer</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="1">Administrator</SelectItem>
              <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="2">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mr-[10px]">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Enter keyword..." />
          </div>
        </div>
      </div>
      <div className="p-0">
        <Button className="bg-[--primary-color] text-white">
          <FaPlus />
          <Link to="/user/create" className="text-white"> Thêm mới thành viên</Link>
        </Button>
      </div>
    </div>
  );
};

export default Filter;
