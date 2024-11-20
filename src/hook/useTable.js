import { useQuery } from 'react-query';
import { userApi } from "../api/userApi";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const useTable = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Default to 10 items per page
  const [filters, setFilters] = useState({});

  const fetchData = async () => {
    let queryString = Object.keys(filters)
      .filter((key) => filters[key] !== '' && filters[key] !== 0 && filters[key] !== 'all')
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
      .join('&');

    queryString += `&page=${page}&limit=${limit}`;
    if (role) queryString += `&role=${role}`;

    return queryString
      ? await userApi.searchUsers(queryString)
      : await userApi.getUsers(page, limit, role ? `&role=${role}` : "");
  };

  const { data, error, isLoading } = useQuery([role, page, limit, filters], fetchData, {
    keepPreviousData: true,
    select: (response) => response || {},
  });

  const handleQueryString = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const newQueryString = `?searchTerm=${filters.searchTerm || ''}&role=${role || ''}&page=${page}&limit=${limit}`;
    navigate(newQueryString, { replace: true });
  }, [page, limit, filters, role, navigate]);

  return {
    data: data?.users || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    error,
    isLoading,
    handleQueryString,
    handlePageChange,
    page,
  };
};

export default useTable;
