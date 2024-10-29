// src/pages/Admin/User.js
import {Link} from 'react-router-dom';
import React from "react";
import PageHeading from "../../../components/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Checkbox } from "../../../components/ui/checkbox";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
const User = () => {
  const breadcrumb = {
    title: 'Quản lý nhân viên',
    to: '/user/employee'
  }

  const TableColumn = [
    'ID',
    'Email',
    'Name',
    'Password',
    'Phone',
    'Avartar',
    'Role',
    'Status',
    'Actions'
  ]
  return (
    <>
      <PageHeading breadcrumb={breadcrumb} />
      <div className="container">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">Quản lý danh sách nhân viên</CardTitle>
            <CardDescription className="text-xs ">Hiển thị danh sách nhân viên, sử dụng các chức năng bên dưới để lọc theo mong muốn</CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Table className="border border-solid border-[#f3f3f3]">
              <TableCaption>Danh sách nhân viên.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Checkbox id="checkAll" />

                  </TableHead>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Avartar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <Checkbox id="checkAll" />
                  </TableCell>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Ảnh</TableCell>
                  <TableCell>Quynnps32187@fpt.edu.vn</TableCell>
                  <TableCell>QuyNguyen</TableCell>
                  <TableCell>12345678</TableCell>
                  <TableCell>0342 2342 354</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell className="text-right">
                    <Switch />
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Button variant="outline"  className=" mr-[15px] bg-[#536485] hover:bg-[#39455c]">
                      <Link to="/user/update"><FaEdit className="text-white text-xl"/></Link>
                    </Button>
                    <Button variant="outline" className=" mr-[15px] bg-[#ec4758] hover:bg-[#d03f4d]">
                      <Link to="/user/update"><MdDeleteForever className="text-white text-xl"/></Link>
                    </Button>
                    <Button variant="outline" className=" bg-[#f8ac59] hover:bg-[#e9a153]">
                      <Link to="/user/update"><MdLockReset className="text-white text-xl"/></Link>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
};

export default User;
