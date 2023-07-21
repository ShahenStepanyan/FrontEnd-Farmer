import { UserType, UserModel } from "../types/User";
import { axiosService, urlWithQuery } from "../utils";

export const login = (
  email: string,
  password: string
): Promise<UserModel & { token: string }> =>
  axiosService.post("/auth/login", { email, password });

export const createUser = (user: UserType): Promise<UserModel> =>
  axiosService.post("/users", user);

export const updateUser = (id: string, user: UserType): Promise<UserModel> =>
  axiosService.patch(`/users/${id}`, user);

export const logout = (): Promise<UserType> =>
  axiosService.post("/users/logout");

export const getUsers = (  
): Promise<Array<UserModel>> => axiosService.get(urlWithQuery("/users"));


export const deleteUser = (id: string) =>
  axiosService.delete(`/users/${id}`) as Promise<UserModel>;
