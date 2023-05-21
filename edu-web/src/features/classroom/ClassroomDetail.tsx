import DropDown from "@/components/dropdown2/DropDown";
import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { deleteMethod2, getMethod2, putMethod2 } from "@/services";
import styles from "@/styles/DetailPageCss";
import { ClassroomResponseType } from "@/types/classroom/ClassroomResponse";
import { ClassroomRequestType } from "@/types/classroom/ClassroomResquest";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { SubjectResponseType } from "@/types/subject/SubjectResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Loading from "../loading";

const defaultClassroom: ClassroomResponseType = {
  id: "",
  name: "",
  description: "",
  isDeleted: false,
  createdDate: "",
  updatedDate: "",
  subjectId: "",
};
const defaultRequest: ClassroomRequestType = {
  subjectId: "",
  name: "",
  description: "",
  isDeleted: false,
};

export const ClassroomDetatil = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const [classroom, setClassroom] =
    useState<ClassroomResponseType>(defaultClassroom);
  const [request, setRequest] = useState<ClassroomRequestType>(defaultRequest);
  const [subjectList, setSubjectList] = useState<SubjectResponseType[]>([]);

  const getRequest = useApiCall<
    SuccessResponse<ClassroomResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.classroom}\/${router?.query?.id || ""}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setClassroom(data.result);
    },
    handleError(status, message) {
      toast.error("NOT FOUND!");
      router.push("/404");
    },
  });
  const getSubject = useApiCall<
    SuccessResponse<SubjectResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.subject}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setSubjectList(data.result.filter((e) => !e.isDeleted));
    },
  });
  const updateRequest = useApiCall<
    SuccessResponse<ClassroomResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      putMethod2({
        pathName: `${apiRoutes.classroom}\/${router?.query?.id || ""}`,
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
        pathName: `${apiRoutes.classroom}\/${router?.query?.id || ""}`,
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
    setClassroom((prev: any) => ({
      ...prev,
      [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
    }));
  };
  const handleChangeDropDown = (
    key: keyof ClassroomRequestType,
    value: any
  ) => {
    setClassroom({
      ...classroom,
      [key]: value,
    });
  };
  const handleUpdate = () => {
    setRequest({
      subjectId: classroom.subjectId || "",
      name: classroom.name,
      description: classroom.description,
      isDeleted: false,
    });
    updateRequest.setLetCall(true);
  };
  const handleDelete = () => {
    // deleteRequest.setLetCall(true);
  };
  const handleCancel = () => {
    router.back();
  };

  useEffect(() => {
    if (router.isReady) {
      getRequest.setLetCall(true);
      getSubject.setLetCall(true);
    }
  }, [router.isReady]);

  return getRequest.loading || getSubject.loading ? (
    <>
      {" "}
      <Loading open={true} />{" "}
    </>
  ) : (
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
              id="id"
              label="ID"
              autoComplete="off"
              value={classroom?.id}
              disabled={true}
            />
            <TextField
              id="name"
              autoComplete="off"
              label="Name"
              value={classroom?.name}
              onChange={handleOnChange}
            />
            <TextField
              id="description"
              autoComplete="off"
              label="Description"
              value={classroom?.description}
              onChange={handleOnChange}
            />
            <DropDown
              id="subjectId"
              label="Subject"
              list={subjectList}
              value={classroom?.subjectId}
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
