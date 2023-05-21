import { User } from "../auth";

export type AuthenticationRedux = {
  isLoading: boolean;
  isLoggedIn: boolean;
  role: string;
  user: User;
};
