import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { postMethod2 } from "@/services";
import styles from "@/styles/DetailPageCss";
import { ClassPeriodTimeRangeRequest } from "@/types/class-period-time-range/ClassPeriodTimeRangeRequest";
import { ClassroomRequestType } from "@/types/classroom/ClassroomResquest";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const defaultRequest: ClassPeriodTimeRangeRequest = {
  numberIndex: 0,
  startTime: "",
  endTime: "",
  description: "",
};

export const ClassPeriodTimeRangeCreate = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const [timeRange, setTimeRange] = useState(defaultRequest);
  const createRequest = useApiCall<
    SuccessResponse<ClassroomRequestType>,
    ErrorResponse
  >({
    callApi: () =>
      postMethod2({
        pathName: `${apiRoutes.periodTimeRange}`,
        token: cookie.token,
        request: {
          ...timeRange,
          numberIndex: +timeRange.numberIndex,
        },
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
  const handleCreate = () => {
    createRequest.setLetCall(true);
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <div>
      <div style={styles.divParent}>
        <div
          style={styles.divSquare}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div style={styles.divTextField}>
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
              autoComplete="off"
              label="End time"
              value={timeRange.endTime}
              onChange={handleOnChange}
            />
          </div>

          <div style={styles.divButtons}>
            <Button variant="outlined" color="warning" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleCreate}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
