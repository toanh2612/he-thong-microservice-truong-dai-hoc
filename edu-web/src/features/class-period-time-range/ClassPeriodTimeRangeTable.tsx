import { apiRoutes, innerRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { getMethod2 } from "@/services";
import { ClassPeriodTimeRangeResponse } from "@/types/class-period-time-range/ClassPeriodTimeRangeResponse";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
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

export const ClassPeriodTimeRangeTable = () => {
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const router = useRouter();

  const [values, setValues] = useState<ClassPeriodTimeRangeResponse[]>([]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 6,
  });
  const [countPage, setCountPage] = useState(1);

  const getRequest = useApiCall<
    SuccessResponse<ClassPeriodTimeRangeResponse[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: apiRoutes.periodTimeRange,
        params: {
          page: params.page,
          perPage: params.pageSize,
        },
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setValues(data.result);
      setCountPage(
        data?.paging ? Math.ceil(data.paging.total / data.paging.perPage) : 1
      );
    },
    handleError(status, message) {
      toast.error(message);
    },
  });

  useEffect(() => {
    getRequest.setLetCall(true);
  }, [params.page]);

  const handleCreate = () => {
    router.push(innerRoutes.periodTimeRange.create);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div style={{ zIndex: 1 }}>
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
                <TableCell>Description</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((row) => (
                <TableRow
                  style={{ cursor: "pointer" }}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    router.push(
                      `${innerRoutes.periodTimeRange.main}\/${row.id}`
                    );
                  }}
                >
                  {/* <TableCell>{row.id}</TableCell> */}
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
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
    </div>
  );
};
