import { api } from "../config/axios";
import {
  ILoginJsonRequest,
  ILoginJsonResponse,
  ILoginRequest,
  ILoginResponse,
} from "@vbkg/types";
import { API_ENDPOINTS } from "@vbkg/utils";

const login = async (input: ILoginRequest): Promise<ILoginResponse> => {
  return await api()
    .post<ILoginResponse>(API_ENDPOINTS.LOGIN, input)
    .then((res) => res.data);
};

const loginJson = async (
  input: ILoginJsonRequest,
): Promise<ILoginJsonResponse> => {
  return await api()
    .post<ILoginJsonResponse>(API_ENDPOINTS.LOGIN_JSON, input)
    .then((res) => res.data);
};

export const AuthService = {
  login,
  loginJson,
};
