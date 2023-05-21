import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { deleteMethod2, getMethod2, putMethod2 } from "@/services";
import styles from "@/styles/DetailPageCss";
import { ClassPeriodTimeRangeRequest } from "@/types/class-period-time-range/ClassPeriodTimeRangeRequest";
import { ClassPeriodTimeRangeResponse } from "@/types/class-period-time-range/ClassPeriodTimeRangeResponse";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Loading from "../loading";
const defaultPeriod: ClassPeriodTimeRangeResponse = {
  id: "",
  numberIndex: 0,
  startTime: "",
  endTime: "",
  description: "",
  isDeleted: false,
  createdDate: "",
  updatedDate: "",
};

const defaultRequest: ClassPeriodTimeRangeRequest = {
  numberIndex: 0,
  startTime: "",
  endTime: "",
  description: "",
};
export const ClassPeriodTimeRangeDetail = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const [timeRange, setTimeRange] = useState(defaultPeriod);

  const [request, setRequest] =
    useState<ClassPeriodTimeRangeRequest>(defaultRequest);

  const getRequest = useApiCall<
    SuccessResponse<ClassPeriodTimeRangeResponse>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.periodTimeRange}\/${router?.query?.id || ""}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setTimeRange(data.result);
    },
    handleError(status, message) {
      toast.error("NOT FOUND!");
      router.push("/404");
    },
  });

  const updateRequest = useApiCall<
    SuccessResponse<ClassPeriodTimeRangeResponse>,
    ErrorResponse
  >({
    callApi: () =>
      putMethod2({
        pathName: `${apiRoutes.periodTimeRange}\/${router?.query?.id || ""}`,
        token: cookie.token,
        request: request,
      }),
    handleSuccess(message, data) {
      toast.success("Success");
      router.back();
    },
    handleError(status, message) {
      toast.error(message);
      router.back();
    },
  });
  const deleteRequest = useApiCall<
    SuccessResponse<ClassPeriodTimeRangeResponse>,
    ErrorResponse
  >({
    callApi: () =>
      deleteMethod2({
        pathName: `${apiRoutes.periodTimeRange}\/${router?.query?.id || ""}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      toast.success("Success");
      router.back();
    },
    handleError(status, message) {
      toast.error(message);
      router.back();
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange((prev: any) => ({
      ...prev,
      [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
    }));
  };
  const handleUpdate = () => {
    setRequest({
      numberIndex: Number(timeRange.numberIndex),
      startTime: timeRange.startTime,
      endTime: timeRange.endTime,
      description: timeRange.description,
    });

    updateRequest.setLetCall(true);
  };
  const handleDelete = () => {
    deleteRequest.setLetCall(true);
  };
  const handleCancel = () => {
    router.back();
  };

  useEffect(() => {
    if (router.isReady) {
      getRequest.setLetCall(true);
    }
  }, [router.isReady]);

  return (
    <div>
      <Loading open={getRequest.loading} />
      <div style={styles.divParent}>
        <div
          style={styles.divSquare}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div style={styles.divTextField}>
            <TextField
              id="id"
              label="IDautoComplete='off'"
              value={timeRange.id}
              disabled={true}
            />
            <TextField
              id="numberIndex"
              autoComplete="off"
              label="Number Index"
              value={timeRange.numberIndex}
              onChange={handleOnChange}
            />
            <TextField
              id="description"
              autoComplete="off"
              label="Description"
              value={timeRange.description}
              onChange={handleOnChange}
            />
            <TextField
              id="startTime"
              autoComplete="off"
              label="Start time"
              value={timeRange.startTime}
              onChange={handleOnChange}
            />
            <TextField
              id="endTime"
              label="End time"
              autoComplete="off"
              value={timeRange.endTime}
              onChange={handleOnChange}
            />
          </div>

          <div style={styles.divButtons}>
            <Button variant="outlined" color="warning" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleUpdate}>
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              style={{
                visibility: "visible",
                opacity: 1,
                display: "inherit",
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
