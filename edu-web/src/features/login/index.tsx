import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth";
import { RoleEnum } from "@/constant/common";
import { useApiCall } from "@/hooks";
import {
  authenticationSelector,
  setIsLoggedIn,
  setRole,
} from "@/redux/authentication";
import { postMethod } from "@/services";
import { Login } from "@/types/auth/Login";
import { LoginResult } from "@/types/auth/LoginResponse";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../loading";

const LoginForm = () => {
  const [value, setValue] = React.useState<Login>({
    username: "",
    password: "",
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, role } = useSelector(authenticationSelector);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleOnChangeFromValue = (type: keyof Login, value: string) => {
    setValue((prev) => ({ ...prev, [type]: value }));
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [cookie, setCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);

  const result = useApiCall<SuccessResponse<LoginResult>, ErrorResponse>({
    callApi: () =>
      postMethod<Login>({
        pathName: apiRoutes.auth.login,
        // params: ,
        request: value,
        // token,
      }),
    handleSuccess(message, data) {
      const roleResponse: string = data.result.payload?.role?.name || "student";

      setCookie(ACCESS_TOKEN, data.result.accessToken, {
        path: "/",
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      });
      setCookie(REFRESH_TOKEN, data.result.refreshToken, {
        path: "/",
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      });

      dispatch(setIsLoggedIn(true));
      dispatch(setRole(roleResponse));

      switch (roleResponse) {
        case RoleEnum.ADMIN:
          router.push("/admin/user");
          break;
        case RoleEnum.TEACHER:
          router.push("/teacher/calendar");
          break;
        case RoleEnum.STUDENT:
          router.push("/student/calendar");
          break;
      }

      toast.success("Success");
    },
    handleError(status, message) {
      toast.error(message);
    },
  });

  if (result.loading) {
    return <Loading open={result.loading} />;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "30%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        // position: "absolute",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Login Form
      </div>
      <div
        //   className=""
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          //   marginTop: "20px",
        }}
      >
        <TextField
          label="Username"
          value={value.username}
          autoComplete="off"
          onChange={(e) => handleOnChangeFromValue("username", e.target.value)}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              result.setLetCall(true);
            }
          }}
        />
        <TextField
          label="Password"
          autoComplete="off"
          type={showPassword ? "text" : "password"}
          value={value.password}
          onChange={(e) => handleOnChangeFromValue("password", e.target.value)}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              result.setLetCall(true);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div
        style={{
          margin: "auto",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Button
          style={{ width: "100%", height: "100%" }}
          variant="contained"
          onClick={() => {
            result.setLetCall(true);
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
export default LoginForm;
