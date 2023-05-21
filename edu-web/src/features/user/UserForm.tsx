import DropDownList from "@/components/dropdown/DropDownList";
import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { deleteMethod, getMethod, postMethod, putMethod } from "@/services";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { RoleResponseType } from "@/types/role/RoleResponse";
import { UserFormType } from "@/types/user/UserForm";
import { UserRequest } from "@/types/user/UserRequest";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { defaultUser } from "./UserTable";

const defaultRoleList: RoleResponseType[] = [];

export const UserForm = ({
  onClickButton,
  setOnClickButton,
  value,
  setValue,
  onRefetch,
}: {
  onClickButton: boolean;
  setOnClickButton: Function;
  value: UserFormType;
  setValue: Function;
  onRefetch: Function;
}) => {
  const handleOnChangeFromValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.id) {
      setValue((prev: any) => ({
        ...prev,
        [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
      }));
    }
  };
  const [roleList, setRoleList] =
    React.useState<RoleResponseType[]>(defaultRoleList);
  const [chosenRoleId, setChosenRoleId] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("male");
  // const [isDeleted, setIsDeleted] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (onClickButton) {
      document.getElementsByTagName("body")[0].classList.add("preventScroll");
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("preventScroll");

      setValue(defaultUser);
      getRoles.setLetCall(true);
    }
  }, [onClickButton]);

  const [cookie] = useCookies([ACCESS_TOKEN]);
  const updateRequest = useApiCall<
    SuccessResponse<UserFormType>,
    ErrorResponse
  >({
    callApi: () =>
      putMethod({
        pathName: `${apiRoutes.user.main}\/${value.id}`,
        token: cookie.token,
        request: value,
      }),
    handleSuccess(message, data) {
      toast.success("Success");
      setOnClickButton(false);
      onRefetch();
    },
    handleError(status, message) {
      toast.error(message);
      setOnClickButton(false);
    },
  });
  const createRequest = useApiCall<
    SuccessResponse<UserFormType>,
    ErrorResponse
  >({
    callApi: () =>
      postMethod({
        pathName: `${apiRoutes.user.main}`,
        token: cookie.token,
        request: value,
      }),
    handleSuccess(message, data) {
      toast.success("Success");
      setOnClickButton(false);
      onRefetch();
    },
    handleError(status, message) {
      toast.error(message);
      setOnClickButton(false);
    },
  });
  const getRoles = useApiCall<
    SuccessResponse<RoleResponseType[]>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod({
        pathName: `${apiRoutes.role}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setRoleList(data.result);
    },
    handleError(status, message) {
      setRoleList(defaultRoleList);
    },
  });
  const deleteUser = useApiCall<SuccessResponse<UserFormType>, ErrorResponse>({
    callApi: () =>
      deleteMethod({
        pathName: `${apiRoutes.user.main}\/${value.id}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      toast.success("Success");
      setOnClickButton(false);
      onRefetch();
    },
    handleError(status, message) {
      toast.error(message);
      setOnClickButton(false);
    },
  });

  const handleSubmit = () => {
    if (value.id) {
      const request: UserRequest = {
        id: value.id,
        email: value.email,
        personalEmail: value.personalEmail,
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        sex: gender,
        birthday: value.birthday,
        roleId: chosenRoleId ? chosenRoleId : value.roleId,
      };

      setValue(request);
      updateRequest.setLetCall(true);
    } else {
      const request: UserRequest = {
        username: value.username,
        password: value.password,
        email: value.email,
        personalEmail: value.personalEmail,
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        sex: gender,
        birthday: value.birthday,
        roleId: chosenRoleId,
      };
      setValue(request);
      createRequest.setLetCall(true);
    }
  };

  const handleDelete = () => {
    deleteUser.setLetCall(true);
  };
  return (
    <div style={{}}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          transition: "all 0.4s linear",
          zIndex: 0,
          visibility: onClickButton ? "visible" : "hidden",
          opacity: onClickButton ? 1 : 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
          backgroundColor: "rgba(0,0,0, 0.4)",
          // filter: "blur(8px)",
          // WebkitFilter: "blur(8px)",
        }}
        // onClick={() => {
        //   setOnClickButton(false);
        // }}
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
          {/* <div
            style={{
              cursor: "pointer",
              width: "fit-content",
            }}
            onClick={() => {
              setOnClickButton(false);
            }}
          >
            <CancelIcon />
          </div> */}
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
              disabled={value.id ? true : false}
              id="username"
              label="Username"
              autoComplete="off"
              value={value.username}
              onChange={handleOnChangeFromValue}
            />
            <TextField
              id="firstName"
              label="First Name"
              autoComplete="off"
              value={value.firstName}
              onChange={handleOnChangeFromValue}
            />
            <TextField
              id="lastName"
              label="Last Name"
              autoComplete="off"
              value={value.lastName}
              onChange={handleOnChangeFromValue}
            />
            <>
              <TextField
                id="password"
                label="Password"
                autoComplete="off"
                value={value.password}
                onChange={handleOnChangeFromValue}
                style={{
                  display: value.id ? "none" : "inherit",
                  width: "100%",
                }}
              />
            </>
            <DropDownList<RoleResponseType>
              id="roleId"
              list={roleList}
              label="Role"
              value={value.roleId}
              setValue={setChosenRoleId}
            />
            <DropDownList<{ id: string; name: string }>
              id="sex"
              list={[
                { id: "male", name: "male" },
                { id: "female", name: "female" },
              ]}
              label="Gender"
              value={value.sex}
              setValue={setGender}
            />
            <TextField
              id="sex"
              label="Gender"
              autoComplete="off"
              value={value.sex}
              onChange={handleOnChangeFromValue}
            />
            <TextField
              id="birthday"
              label="Birthday"
              autoComplete="off"
              value={value.birthday}
              onChange={handleOnChangeFromValue}
            />
            <TextField
              id="phone"
              label="Phone"
              autoComplete="off"
              value={value.phone}
              onChange={handleOnChangeFromValue}
            />
            <TextField
              id="email"
              label="Email"
              autoComplete="off"
              value={value.email}
              onChange={handleOnChangeFromValue}
            />
            <TextField
              id="personalEmail"
              label="Personal Email"
              autoComplete="off"
              value={value.personalEmail}
              onChange={handleOnChangeFromValue}
            />
            {/* <DropDownList<{ id: boolean; name: string }>
              id="isDelete"
              list={[
                { id: true, name: "Deleted" },
                { id: false, name: "Existed" },
              ]}
              label="Status"
              value={value.isDeleted}
              setValue={setIsDeleted}
            /> */}
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
            <Button
              variant="outlined"
              color="warning"
              onClick={() => {
                setOnClickButton(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              style={{
                visibility: value.id ? "visible" : "hidden",
                opacity: value.id ? 1 : 0,
                display: value.id ? "inherit" : "none",
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
