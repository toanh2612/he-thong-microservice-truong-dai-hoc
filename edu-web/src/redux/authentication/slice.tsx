import { User } from "@/types";
import { AuthenticationRedux } from "@/types/redux/Authentication";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthenticationRedux = {
  user: {
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    token: "",
  },
  isLoggedIn: false,
  isLoading: false,
  role: "",
};

const AuthenticationSlice = createSlice({
  name: "authentication_store",
  initialState,
  reducers: {
    // setSignUpRequest: (
    //   state,
    //   actions: PayloadAction<Partial<SignUpRequest>>
    // ) => {
    //   const signUpRequest = {
    //     ...state.signUpRequest,
    //     ...actions.payload,
    //   };
    //   state.signUpRequest = signUpRequest;
    // },
    // setIsForbidden: (state, actions: PayloadAction<boolean>) => {
    //   state.isForbidden = actions.payload;
    // },
    // resetSignUpRequest: (state) => {
    //   state.signUpRequest = initialState.signUpRequest;
    // },
    reset: (state) => {
      Object.assign(state, initialState);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, actions: PayloadAction<boolean>) => {
      state.isLoggedIn = actions.payload;
    },
    setIsLoading: (state, actions: PayloadAction<boolean>) => {
      state.isLoading = actions.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

export const { reset, setIsLoggedIn, setIsLoading, setUser, setRole } =
  AuthenticationSlice.actions;

export default AuthenticationSlice;
