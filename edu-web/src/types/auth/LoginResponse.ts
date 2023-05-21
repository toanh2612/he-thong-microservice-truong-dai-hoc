import { RoleResponseType } from "../role/RoleResponse";

export type PayloadResponse = {
  id: string;
  username: string;
  email: string;
  personalEmail: string;
  role: RoleResponseType;
};

export type LoginResult = {
  payload: PayloadResponse;
  accessToken: string;
  refreshToken: string;
};
