import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTableRT = ({ apiMethod }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1); // Current page
  const [limit] = useState(3); // Items per page
  const [filters, setFilters] = useState({}); // Filters

  // Fetch data function
  const fetchData = async () => {
    const { search, sort } = filters;
    const response = await apiMethod(page, limit, { search, sort });
    return response;
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["roomTypes", page, limit, filters],
    fetchData,
    {
      keepPreviousData: true,
    }
  );

  const handleQueryString = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Update URL with filters or page changes
  useEffect(() => {
    const queryParamsObj = {
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    };

    Object.keys(queryParamsObj).forEach((key) => {
      if (!queryParamsObj[key]) {
        delete queryParamsObj[key];
      }
    });

    const queryParams = new URLSearchParams(queryParamsObj).toString();

    navigate(queryParams ? `?${queryParams}` : "", { replace: true });
  }, [page, limit, filters, navigate]);

  return {
    data: data?.roomTypes || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    error,
    isLoading,
    page,
    filters,
    handlePageChange: setPage,
    handleFiltersChange: setFilters,
    refetch,
    handleQueryString,
  };
};

export default useTableRT;
