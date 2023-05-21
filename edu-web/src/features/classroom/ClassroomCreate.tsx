import DropDown from "@/components/dropdown2/DropDown";
import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { getMethod2, postMethod2 } from "@/services";
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

const defaultRequest: ClassroomRequestType = {
  subjectId: "",
  name: "",
  description: "",
  isDeleted: false,
};

export const ClassroomCreate = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const [classroom, setClassroom] = useState(defaultRequest);
  const [dropDown, setDropDown] = useState({
    subjectId: "",
  });
  const [subjectList, setSubjectList] = useState<SubjectResponseType[]>([]);
  const createRequest = useApiCall<
    SuccessResponse<ClassroomResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      postMethod2({
        pathName: `${apiRoutes.classroom}`,
        token: cookie.token,
        request: classroom,
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

  const getSubject = useApiCall<
    SuccessResponse<SubjectResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.subject}`,
        params: {
          perPage: 50,
          page: 1,
        },
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setSubjectList(data.result.filter((e) => e.isDeleted == false));
    },
  });

  useEffect(() => {
    getSubject.setLetCall(true);
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassroom((prev: any) => ({
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
  const handleChangeDropDown = (
    key: keyof ClassroomRequestType,
    value: any
  ) => {
    setClassroom({
      ...classroom,
      [key]: value,
    });
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
            {/* <TextField
              id="id"
              label="ID"
              value={classroom.id}
              disabled={true}
            /> */}
            <TextField
              id="name"
              label="Name"
              autoComplete="off"
              value={classroom.name}
              onChange={handleOnChange}
            />
            <TextField
              id="description"
              label="Description"
              autoComplete="off"
              value={classroom.description}
              onChange={handleOnChange}
            />

            <DropDown
              id="subjectId"
              label="Subject"
              list={subjectList}
              value={classroom.subjectId}
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
