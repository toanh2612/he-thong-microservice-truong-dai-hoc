import DropDown from "@/components/dropdown2/DropDown";
import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { deleteMethod2, getMethod2, putMethod2 } from "@/services";
import styles from "@/styles/DetailPageCss";
import { ClassPeriodRequest } from "@/types/class-period/ClassPeriodRequest";
import { ClassPeriodResponse } from "@/types/class-period/ClassPeriodResponse";
import { ClassroomRequestType } from "@/types/classroom/ClassroomResquest";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { SubjectResponseType } from "@/types/subject/SubjectResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { AddressResponseType } from "../../types/address/AddressResponse";
import { ClassroomResponseType } from "../../types/classroom/ClassroomResponse";
import { ClassPeriodTimeRangeResponse } from "@/types/class-period-time-range/ClassPeriodTimeRangeResponse";
import Loading from "../loading";

const defaultClassroom: ClassPeriodResponse = {
  id: "",
  addressId: "",
  classPeriodTimeRangeId: "",
  classroomId: "",
  dateTime: "",
  description: "",
  isDeleted: false,
  createdDate: "",
  updatedDate: "",
  address: {
    id: "",
    name: "",
    description: "",
    isDeleted: false,
    createdDate: "",
    updatedDate: "",
  },
  classroom: {
    id: "",
    subjectId: "",
    name: "",
    description: "",
    isDeleted: false,
    createdDate: "",
    updatedDate: "",
    subject: undefined,
  },
  classPeriodTimeRange: {
    id: "",
    numberIndex: 0,
    startTime: "",
    endTime: "",
    description: "",
    isDeleted: false,
    createdDate: "",
    updatedDate: "",
    name: undefined,
  },
};
const defaultRequest: ClassPeriodRequest = {
  subjectId: "",
  addressId: "",
  classroomId: "",
  classPeriodTimeRangeId: "",
  dateTime: "",
  description: "",
};

export const ClassPeriodDetatil = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const [classPeriod, setClassPeriod] =
    useState<ClassPeriodResponse>(defaultClassroom);
  const [request, setRequest] = useState<ClassPeriodRequest>(defaultRequest);
  const [subjectList, setSubjectList] = useState<SubjectResponseType[]>([]);
  const [address, setAddress] = useState<AddressResponseType[]>([]);
  const [classroom, setClassroom] = useState<ClassroomResponseType[]>([]);
  const [timeRange, setTimeRange] = useState<ClassPeriodTimeRangeResponse[]>(
    []
  );

  const getRequest = useApiCall<
    SuccessResponse<ClassPeriodResponse>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.classPeriod}\/${router?.query?.id || ""}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setClassPeriod(data.result);
    },
    handleError(status, message) {
      toast.error("NOT FOUND!");
      router.push("/404");
    },
  });

  const getAddress = useApiCall<
    SuccessResponse<AddressResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.address}`,
        token: cookie.token,
        params: {
          isDeleted: false,
        },
      }),
    handleSuccess(message, data) {
      setAddress(data.result.filter((e) => e.isDeleted !== true));
    },
    handleError(status, message) {
      toast.error("NOT FOUND!");
      router.back();
    },
  });
  const getClassroom = useApiCall<
    SuccessResponse<ClassroomResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.classroom}`,
        token: cookie.token,
        params: {
          isDeleted: false,
        },
      }),
    handleSuccess(message, data) {
      setClassroom(data.result.filter((e) => e.isDeleted !== true));
    },
    handleError(status, message) {
      toast.error(message);
      router.back();
    },
  });
  const getTimeRange = useApiCall<
    SuccessResponse<ClassPeriodTimeRangeResponse[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.periodTimeRange}`,
        token: cookie.token,
        params: {
          isDeleted: false,
        },
      }),
    handleSuccess(message, data) {
      setTimeRange(data.result.filter((e) => e.isDeleted !== true));
    },
    handleError(status, message) {
      toast.error(message);
      router.back();
    },
  });
  const updateRequest = useApiCall<
    SuccessResponse<ClassPeriodResponse>,
    ErrorResponse
  >({
    callApi: () =>
      putMethod2({
        pathName: `${apiRoutes.classPeriod}\/${router?.query?.id || ""}`,
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
    SuccessResponse<ClassroomResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      deleteMethod2({
        pathName: `${apiRoutes.classPeriod}\/${router?.query?.id || ""}`,
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
    setClassPeriod((prev: any) => ({
      ...prev,
      [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
    }));
  };
  const handleChangeDropDown = (
    key: keyof ClassroomRequestType,
    value: any
  ) => {
    setClassPeriod({
      ...classPeriod,
      [key]: value,
    });
  };
  const handleUpdate = () => {
    setRequest({
      subjectId: classPeriod?.subjectId || "",
      addressId: classPeriod.addressId,
      classroomId: classPeriod.classroomId,
      classPeriodTimeRangeId: classPeriod.classPeriodTimeRangeId,
      dateTime: classPeriod.dateTime,
      description: classPeriod.description,
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
      getAddress.setLetCall(true);
      getClassroom.setLetCall(true);
      getTimeRange.setLetCall(true);
      // getSubject.setLetCall(true);
    }
  }, [router.isReady]);

  return (
    <div>
      <Loading
        open={
          getRequest.loading ||
          getAddress.loading ||
          getClassroom.loading ||
          getTimeRange.loading
        }
      />
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
              autoComplete="off"
              label="ID"
              value={classPeriod.id}
              disabled={true}
            />

            <TextField
              id="description"
              autoComplete="off"
              label="Description"
              value={classPeriod.description}
              onChange={handleOnChange}
            />
            <TextField
              id="dateTeme"
              autoComplete="off"
              label="Date time"
              value={classPeriod.dateTime}
              onChange={handleOnChange}
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
              label="Class Time Range"
              list={timeRange.map((e) => {
                return {
                  ...e,
                  name: `${e.description} (${e.startTime} - ${e.endTime})`,
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
