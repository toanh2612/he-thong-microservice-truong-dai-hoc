import { apiRoutes, innerRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { getMethod2 } from "@/services";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { SubjectResponseType } from "@/types/subject/SubjectResponse";
import { UserFormType } from "@/types/user/UserForm";
import {
  Button,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
const users: UserFormType[] = [];
export const SubjectTable = () => {
  const [values, setValues] = useState<SubjectResponseType[]>([]);
  const [cookie, setCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 6,
  });
  const [countPage, setCountPage] = useState(1);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };
  const getListSubject = useApiCall<
    SuccessResponse<SubjectResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: apiRoutes.subject,
        params: {
          perPage: params.pageSize,
          page: params.page,
        },
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setValues(data.result.filter((e) => !e.isDeleted));
      setCountPage(
        data?.paging ? Math.ceil(data.paging.total / data.paging.perPage) : 1
      );
    },

    handleError(status, message) {
      toast.error(message);
    },
  });

  useEffect(() => {
    getListSubject.setLetCall(true);
  }, [params.page]);

  const handleCreate = () => {
    router.push(innerRoutes.subject.create);
  };
  return (
    <>
      <Button
        onClick={handleCreate}
        variant="contained"
        style={{
          margin: "1rem 0",
        }}
      >
        Add
      </Button>
      <TableContainer component={Paper} className="scroll-x-auto">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((row) => (
              <TableRow
                style={{ cursor: "pointer" }}
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  router.push(`${innerRoutes.subject.main}\/${row.id}`);
                }}
              >
                {/* <TableCell>{row.id}</TableCell> */}
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};
