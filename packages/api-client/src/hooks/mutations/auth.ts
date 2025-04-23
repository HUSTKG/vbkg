import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  ILoginRequest,
  ILoginResponse,
  ILoginJsonRequest,
  ILoginJsonResponse,
} from "@vbkg/types";
import { AuthService } from "../../services";

export const useLogin = (
  options: UseMutationOptions<ILoginResponse, Error, ILoginRequest>,
) => {
  return useMutation<ILoginResponse, Error, ILoginRequest>({
    mutationFn: async (input: ILoginRequest) => AuthService.login(input),
    ...options,
  });
};

export const useLoginJson = (
  options: UseMutationOptions<ILoginJsonResponse, Error, ILoginJsonRequest>,
) => {
  return useMutation<ILoginJsonResponse, Error, ILoginJsonRequest>({
    mutationFn: async (input: ILoginJsonRequest) =>
      AuthService.loginJson(input),
    ...options,
  });
};
