import React from 'react';
import PageHeading from "../../../components/heading";
import { tableColumn, breadcrumb, buttonAction } from "../../../api/userApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { LoadingSpinner } from '../../../components/ui/loading';
import Filter from '../../../components/ui/filter';
import CustomTable from '../../../components/ui/customTable';
import useCheckBoxState from '../../../hook/useCheckBoxState';
import useTable from '../../../hook/useTable';
import Paginate from '../../../components/Pagination';

const RoleBasedIndex = ({ role, title, breadcrumbKey }) => {
  const {
    data,
    total,
    totalPages,
    error,
    isLoading,
    handleQueryString,
    handlePageChange,
    page,
  } = useTable({ role });

  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckAllChange,
    isAnyChecked,
  } = useCheckBoxState(data || []);

  const somethingChecked = isAnyChecked();

  return (
    <>
      <PageHeading breadcrumb={breadcrumb[breadcrumbKey]} />
      <div className="container">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">{title}</CardTitle>
            <CardDescription className="text-xs">
              Quản lý danh sách {title.toLowerCase()}, sử dụng các chức năng bên dưới để quản lý.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={somethingChecked}
              checkedState={checkedState}
              handleQueryString={handleQueryString}
            />
            {isLoading && (
              <p className="flex text-center items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </p>
            )}
            {error && (
              <p className="text-red-500">
                Lỗi khi tải dữ liệu: {error.message}
              </p>
            )}
            <CustomTable
              data={data}
              columns={tableColumn}
              actions={buttonAction}
              caption={`Danh sách ${title.toLowerCase()}`}
              checkedState={checkedState}
              checkedAllState={checkedAllState}
              handleCheckedChange={handleCheckedChange}
              handleCheckAllChange={handleCheckAllChange}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Paginate
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RoleBasedIndex;
