export {
  default as axiosService,
  setToken,
  revokeToken,
  CRUDFunc,
} from "./api";

export const urlWithQuery = (url: string, query: Record<string, any> = {}) => {
  const queryObj: typeof query = {};
  for (const key in query) {
    queryObj[key] =
      typeof query[key] === "object" ? JSON.stringify(query[key]) : query[key];
  }
  const searchParams = new URLSearchParams(queryObj).toString();
  return `${url}${searchParams ? `?${searchParams}` : ""}`;
};
