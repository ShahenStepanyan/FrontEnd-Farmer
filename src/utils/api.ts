import axios from "axios";
import { urlWithQuery } from ".";

import type { BaseModel, QueryProps } from "../types";

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_BACK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = JSON.parse(localStorage.getItem("current-user") || "{}")?.token;

if (token) {
  axiosService.defaults.headers.common.Authorization = `Bearer ${token}`;
}

axiosService.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.setItem("current-user", "null");
      window.location.pathname = "/login";
      // window.location.reload();
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export const setToken = (token: string) => {
  axiosService.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const revokeToken = () => {
  delete axiosService.defaults.headers.common.Authorization;
};

export default axiosService;

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_API, // api of base_url
//   timeout: 5000, // request timeout
// });

// axiosInstance.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const message = error.response?.data?.message || error.message;
//     // error.response?.config && console.error(error.response?.config);
//     // console.error(`Api Error: ${message}`);
//     error.message = message;
//     return Promise.reject(error);
//   }
// );

export function CRUDFunc<M = BaseModel>(url: string) {
  type Model = BaseModel<M>;
  type QueryType = QueryProps<Model>;

  return {
    create: (data: M) => axiosService.post(url, data) as Promise<Model>,
    find: <Q extends QueryType>(query?: Q) =>
      axiosService.get(urlWithQuery(url, query)) as Promise<
        Q["total"] extends true
          ? { data: Array<Model>; total: number }
          : Array<Model>
      >,
    findById: (id: string, query?: QueryType) =>
      axiosService.get(urlWithQuery(`${url}/${id}`, query)) as Promise<Model>,
    update: (id: string, data: Partial<M>) =>
      axiosService.patch(`${url}/${id}`, data) as Promise<Model>,
    remove: (id: string) =>
      axiosService.patch(`${url}/${id}`, { removed: true }) as Promise<Model>,
    destroy: (id: string) =>
      axiosService.delete(`${url}/${id}`) as Promise<Model>,
  };
}

// const urlWithQuery = (url: string, query: Record<string, any> = {}) => {
//   const searchParams = new URLSearchParams(query).toString();
//   return `${url}${searchParams ? `?${searchParams}` : ""}`;
// };

// enum MethodEnum {
//   get = "get",
//   post = "post",
//   patch = "patch",
//   delete = "delete",
// }

// type ExtraMethodObject = {
//   url: string;
//   method: MethodEnum;
// };
// // type ExtraMethod = ExtraMethodObject | string;

// type ReqType = (data?: any, config?: AxiosRequestConfig<any>) => Promise<any>

// /**
//  * @template E
//  * @param {string} url
//  * @param {E} extraMethods
//  * @returns {ReturnType<typeof CRUDFunc> & {
//  *    [key in keyof E]: E[key] extends string
//  *      ? (query?: Record<string, any>, config?: import("axios").AxiosRequestConfig) => Promise<void>
//  *      : (data?: any, config?: import("axios").AxiosRequestConfig) => Promise<void>
//  * }}
//  */
// export function Methods<E extends Record<any, any>>(url: string, extraMethods: E) {
//   const methods = {} as {
//     [key in keyof E]: ReqType
//   };
//   Object.keys(extraMethods).forEach((key) => {
//     switch (typeof extraMethods[key]) {
//       case "string": {
//         methods[key as keyof E] = (query = {}, config = {}) =>
//           axiosInstance.get(
//             urlWithQuery(`${url}/${extraMethods[key]}`, query),
//             config
//           );
//         break;
//       }
//       case "object": {
//         const { method, url: _url } = extraMethods[key] as ExtraMethodObject
//         console.log("object");
//         const args: any = [];
//         methods[key as keyof E] = (data = {}, config = {}) => {
//           const hasQuery = ["get", "delete"].includes(method);
//           const methodUrl = hasQuery
//             ? urlWithQuery(`${url}/${_url}`, data)
//             : `${url}/${_url}`;
//           args.push(methodUrl);
//           if (!hasQuery) {
//             args.push(data);
//           }
//           args.push(config);
//           console.log(args, "args");
//           // @ts-ignore
//           return axiosInstance[method](...args);
//         };
//         break;
//       }
//       default:
//         break;
//     }
//   });
//   return methods;
// }

// export default function API<M = Record<any, any>, E = Record<any, any>>(url: string, extraMethods: E = {} as E) {
//   return {
//     ...CRUDFunc<M>(url),
//     ...Methods<E>(url, extraMethods),
//   };
// }
