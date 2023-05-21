import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth";
import { UserTable } from "@/features/user";
import { useApiCall } from "@/hooks";
import { getMethod } from "@/services";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { UserFormType } from "@/types/user/UserForm";
import { Pagination, Stack, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export default function User() {
  const [users, setUsers] = useState<UserFormType[]>([]);
  const [cookie, setCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 6,
  });
  const [countPage, setCountPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };

  const result = useApiCall<SuccessResponse<UserFormType[]>, ErrorResponse>({
    callApi: () =>
      getMethod({
        pathName: apiRoutes.user.main,
        params: {
          perPage: params.pageSize,
          page: params.page,
        },
        // request: value,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setUsers(data.result);
      setCountPage(
        data?.paging ? Math.ceil(data.paging.total / data.paging.perPage) : 1
      );
    },

    handleError(status, message) {
      toast.error(message);
    },
  });

  useEffect(() => {
    result.setLetCall(true);
  }, [params.page]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div style={{ zIndex: 1 }}>
        <UserTable
          users={[...users]}
          onRefetch={() => result.setLetCall(true)}
        />
      </div>
      <Stack
        spacing={2}
        style={{
          zIndex: 0,
        }}
      >
        <Pagination
          count={countPage}
          defaultPage={1}
          boundaryCount={2}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
