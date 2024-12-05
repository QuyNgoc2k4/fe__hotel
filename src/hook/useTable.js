import { useQuery } from "react-query";
import { userApi } from "../api/userApi";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useTable = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Số lượng mục trên mỗi trang
  const [filters, setFilters] = useState({});

  const fetchData = async () => {
    let queryString = Object.keys(filters)
      .filter((key) => filters[key] !== "" && filters[key] !== 0 && filters[key] !== "all")
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
      .join("&");

    queryString += `&page=${page}&limit=${limit}`;
    if (role) queryString += `&role=${role}`;

    return queryString
      ? await userApi.searchUsers(queryString)
      : await userApi.getUsers(page, limit, role ? `&role=${role}` : "");
  };

  const { data, error, isLoading, refetch } = useQuery([role, page, limit, filters], fetchData, {
    keepPreviousData: true,
    select: (response) => response || {},
  });

  const handleQueryString = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filters.searchTerm) queryParams.append("searchTerm", filters.searchTerm);
    if (role) queryParams.append("role", role);
    queryParams.append("page", page);
    queryParams.append("limit", limit);

    const queryString = queryParams.toString();
    navigate(queryString ? `?${queryString}` : location.pathname, { replace: true });
  }, [page, limit, filters, role, navigate, location.pathname]);

  return {
    data: data?.users || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    error,
    isLoading,
    handleQueryString,
    handlePageChange,
    refetch,
    page,
    limit,
    filters, // Trả filters để sử dụng trong component
  };
};

export default useTable;
