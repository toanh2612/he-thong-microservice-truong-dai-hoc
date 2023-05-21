import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { deleteMethod2, getMethod2, putMethod2 } from "@/services";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { SubjectResponseType } from "@/types/subject/SubjectResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Loading from "../loading";

const defaultSubjectDetail: SubjectResponseType = {
  id: "",
  name: "",
  description: "",
  isDeleted: false,
  createdDate: "",
  updatedDate: "",
  classrooms: [],
};

export const SubjectDetail = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);

  const [subjectDetail, setSubjectDetail] =
    useState<SubjectResponseType>(defaultSubjectDetail);

  const getSubjectDetail = useApiCall<
    SuccessResponse<SubjectResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.subject}\/${router?.query?.id || ""}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      toast.success("Success");
      setSubjectDetail(data.result);
    },
    handleError(status, message) {
      toast.error("NOT FOUND!");
      router.push("/404");
    },
  });
  const updateSubject = useApiCall<
    SuccessResponse<SubjectResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      putMethod2({
        pathName: `${apiRoutes.subject}\/${router?.query?.id || ""}`,
        token: cookie.token,
        request: subjectDetail,
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
  const deleteSubject = useApiCall<
    SuccessResponse<SubjectResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      deleteMethod2({
        pathName: `${apiRoutes.subject}\/${router?.query?.id || ""}`,
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

  useEffect(() => {
    if (router.isReady) {
      getSubjectDetail.setLetCall(true);
    }
  }, [router.isReady]);

  const handleOnChangeFromValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.id) {
      setSubjectDetail((prev: any) => ({
        ...prev,
        [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
      }));
    }
  };

  const handleCancel = () => {
    router.back();
  };
  const handleUpdate = () => {
    updateSubject.setLetCall(true);
  };
  const handleDelete = () => {
    deleteSubject.setLetCall(true);
  };

  return (
    <>
      <Loading
        open={
          getSubjectDetail.loading ||
          updateSubject.loading ||
          deleteSubject.loading
        }
      />
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            transition: "all 0.4s linear",
            zIndex: 0,
            visibility: "visible",
            opacity: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
            backgroundColor: "rgba(0,0,0, 0.4)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "80%",
              maxHeight: "80%",
              padding: "1rem",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              overflowY: "auto",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "1rem",
                overflowY: "auto",
                paddingTop: "1rem",
              }}
            >
              <TextField
                id="id"
                label="ID"
                autoComplete="off"
                value={subjectDetail.id}
                disabled={true}
              />
              <TextField
                id="name"
                autoComplete="off"
                label="Name"
                value={subjectDetail.name}
                onChange={handleOnChangeFromValue}
              />
              <TextField
                id="description"
                autoComplete="off"
                label="Description"
                value={subjectDetail.description}
                onChange={handleOnChangeFromValue}
              />
            </div>

            <div
              style={{
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "end",
                gap: "1.5rem",
              }}
            >
              <Button variant="outlined" color="warning" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleUpdate}
              >
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
    </>
  );
};
