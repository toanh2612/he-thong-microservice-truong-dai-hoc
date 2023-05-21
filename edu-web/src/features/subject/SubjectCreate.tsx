import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { postMethod2 } from "@/services";
import { CommonResponseType } from "@/types";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { SubjectRequestType } from "@/types/subject/SubjectRequest";
import { SubjectResponseType } from "@/types/subject/SubjectResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Loading from "../loading";

const defaultSubject: SubjectRequestType = {
  name: "",
  description: "",
};

export const SubjectCreate = () => {
  const [subject, setSubject] = useState<SubjectRequestType>(defaultSubject);

  const handleOnChangeFromValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject((prev: any) => ({
      ...prev,
      [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
    }));
  };

  const router = useRouter();

  const [cookie] = useCookies([ACCESS_TOKEN]);
  const createSubject = useApiCall<
    SuccessResponse<SubjectResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      postMethod2({
        pathName: `${apiRoutes.subject}`,
        token: cookie.token,
        request: subject,
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

  const handleCreate = () => {
    createSubject.setLetCall(true);
  };
  const handleCancel = () => {
    setSubject(defaultSubject);
    router.back();
  };
  return (
    <>
      <Loading open={createSubject.loading} />
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
                id="name"
                autoComplete="off"
                label="Name"
                value={subject.name}
                onChange={handleOnChangeFromValue}
              />
              <TextField
                id="description"
                autoComplete="off"
                label="Description"
                value={subject.description}
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
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
