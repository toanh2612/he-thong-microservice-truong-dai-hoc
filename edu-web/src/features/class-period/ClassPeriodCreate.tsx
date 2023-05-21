import DropDown from "@/components/dropdown2/DropDown";
import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { getMethod2, postMethod2 } from "@/services";
import styles from "@/styles/DetailPageCss";
import { AddressResponseType } from "@/types/address/AddressResponse";
import { ClassPeriodTimeRangeResponse } from "@/types/class-period-time-range/ClassPeriodTimeRangeResponse";
import { ClassPeriodRequest } from "@/types/class-period/ClassPeriodRequest";
import { ClassroomResponseType } from "@/types/classroom/ClassroomResponse";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { SubjectResponseType } from "@/types/subject/SubjectResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const defaultClassPeriod: ClassPeriodRequest = {
  subjectId: "",
  addressId: "",
  classroomId: "",
  classPeriodTimeRangeId: "",
  dateTime: "",
  description: "",
};

export const ClassPeriodCreate = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);

  const [classPeriod, setClassPeriod] =
    useState<ClassPeriodRequest>(defaultClassPeriod);
  const [subject, setSubject] = useState<SubjectResponseType[]>([]);
  const [address, setAddress] = useState<AddressResponseType[]>([]);
  const [classroom, setClassroom] = useState<ClassroomResponseType[]>([]);
  const [timeRange, setTimeRange] = useState<ClassPeriodTimeRangeResponse[]>(
    []
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassPeriod((prev: any) => ({
      ...prev,
      [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
    }));
  };

  const create = useApiCall<
    SuccessResponse<SubjectResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      postMethod2({
        pathName: `${apiRoutes.classPeriod}`,
        token: cookie.token,
        request: classPeriod,
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

  const getListSubject = useApiCall<
    SuccessResponse<SubjectResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: apiRoutes.subject,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setSubject(data.result.filter((e) => !e.isDeleted));
    },
    handleError(status, message) {
      toast.error(message);
    },
  });
  const getAddress = useApiCall<
    SuccessResponse<AddressResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: apiRoutes.address,
        token: cookie.token,
        params: {
          isDeleted: false,
        },
      }),
    handleSuccess(message, data) {
      setAddress(data.result.filter((e) => !e.isDeleted));
    },
    handleError(status, message) {
      toast.error(message);
    },
  });
  const getClassroom = useApiCall<
    SuccessResponse<ClassroomResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: apiRoutes.classroom,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setClassroom(data.result.filter((e) => !e.isDeleted));
    },
    handleError(status, message) {
      toast.error(message);
    },
  });
  const getTimeRange = useApiCall<
    SuccessResponse<ClassPeriodTimeRangeResponse[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: apiRoutes.periodTimeRange,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setTimeRange(data.result.filter((e) => !e.isDeleted));
    },
    handleError(status, message) {
      toast.error(message);
    },
  });

  const handleCreate = () => {
    create.setLetCall(true);
  };
  const handleCancel = () => {
    setClassPeriod(defaultClassPeriod);
    router.back();
  };
  const handleChangeDropDown = (key: keyof ClassPeriodRequest, value: any) => {
    setClassPeriod({
      ...classPeriod,
      [key]: value,
    });
    console.log(111, classPeriod);
  };

  useEffect(() => {
    if (router.isReady) {
      getListSubject.setLetCall(true);
      getAddress.setLetCall(true);
      getClassroom.setLetCall(true);
      getTimeRange.setLetCall(true);
    }
  }, []);

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
              id="description"
              autoComplete="off"
              label="Description"
              value={classPeriod.description}
              onChange={handleOnChange}
            />
            <TextField
              id="dateTime"
              autoComplete="off"
              label="Date Time"
              value={classPeriod.dateTime}
              onChange={handleOnChange}
            />

            <DropDown
              id="subjectId"
              label="Subject"
              list={subject}
              value={classPeriod.subjectId}
              setValue={handleChangeDropDown}
            />
            <DropDown
              id="addressId"
              label="Address"
              list={address}
              value={classPeriod.addressId}
              setValue={handleChangeDropDown}
            />
            <DropDown
              id="classroomId"
              label="Classroom"
              list={classroom}
              value={classPeriod.classroomId}
              setValue={handleChangeDropDown}
            />
            <DropDown
              id="classPeriodTimeRangeId"
              label="Period Time Range"
              list={timeRange.map((e) => {
                return {
                  ...e,
                  name: e.description,
                };
              })}
              value={classPeriod.classPeriodTimeRangeId}
              setValue={handleChangeDropDown}
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
