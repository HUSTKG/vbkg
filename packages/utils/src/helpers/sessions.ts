import { Session } from "@vbkg/types";
import { SESSION_STORAGE_KEY } from "../constants";

export const setSession = (session: Session | null) => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
};

export const getSession = (): Session | null => {
  const session = localStorage.getItem(SESSION_STORAGE_KEY);
  return session ? JSON.parse(session) : null;
};
