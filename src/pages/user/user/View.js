// src/pages/user/user/View.js
import React from 'react';
import PageHeading from "../../../components/heading";
import { userApi, tableColumn } from "../../../api/userApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useQuery } from 'react-query';
import { LoadingSpinner } from '../../../components/ui/loading';
import Filter from '../../../components/ui/filter';
import CustomTable from '../../../components/ui/customTable';
import useCheckBoxState from '../../../hook/useCheckBoxState';

const User = () => {
  const breadcrumb = {
    title: 'Quản lý nhân viên',
    to: '/user/employee',
  };

  // Sử dụng useQuery để lấy danh sách người dùng từ API
  const { data, error, isLoading } = useQuery('users', userApi.getUsers, {
    select: (response) => response?.data?.data || [], // Đảm bảo lấy đúng dữ liệu từ response
  });
  
  // Sử dụng hook để quản lý trạng thái checkbox
  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckAllChange,
    isAnyChecked,
  } = useCheckBoxState(data || []);

  // Gọi isAnyChecked để lấy giá trị boolean
  const somethingChecked = isAnyChecked();

  return (
    <>
      <PageHeading breadcrumb={breadcrumb} />
      <div className="container">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">Quản lý danh sách nhân viên</CardTitle>
            <CardDescription className="text-xs">
              Hiển thị danh sách nhân viên, sử dụng các chức năng bên dưới để lọc theo mong muốn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter isAnyChecked={somethingChecked} checkedState={checkedState}/> {/* Truyền giá trị boolean */}
            {isLoading && (
              <p className="flex text-center items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </p>
            )}
            {error && <p className="text-red-500">Lỗi khi lấy người dùng: {error.message}</p>}
            <CustomTable
              data={data}
              columns={tableColumn}
              caption="Danh sách nhân viên"
              checkedState={checkedState}
              checkedAllState={checkedAllState}
              handleCheckedChange={handleCheckedChange}
              handleCheckAllChange={handleCheckAllChange}
            />
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default User;
