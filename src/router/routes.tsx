import { Navigate, RouteObject } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import LoginLayout from "./LoginLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Animals from "../pages/Animals";
import SelectFields from "../pages/SelectFields";
import Users from "../pages/Users";
import Animal from "../pages/Animal";
import Calendar from "../components/Calendar/Calendar";
import { RoleEnum } from "../types/User";
import Spending from "../pages/Spending";

interface RouteObjectWithRole extends RouteObject {
  roles?: RoleEnum[];
  children?: RouteObjectWithRole[];
}

const routes: Array<RouteObjectWithRole> = [
  {
    element: <LoginLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <AuthLayout />,
    path: "/",
    children: [
      { element: <Dashboard />, index: true },
      { path: "/animals", element: <Animals /> },
      { path: "/animals/:id", element: <Animal /> },
      { path: "/select-fields", element: <SelectFields /> },
      { path: "/spending", element: <Spending /> },
      { path: "/users", element: <Users />, roles: [RoleEnum.ADMIN] },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];

export const breadcrumbMap: Record<
  string,
  Array<{ title: string; path?: string }>
> = {
  "/": [{ title: "Dashboard" }],
  "/animals": [{ title: "Dashboard", path: "/" }, { title: "Animals" }],
  "/animals/:id": [
    { title: "Dashboard", path: "/" },
    { title: "Animals", path: "/animals" },
    { title: "Animal" },
  ],
  "/select-fields": [
    { title: "Dashboard", path: "/" },
    { title: "Select Fields" },
  ],
  "/users": [{ title: "Dashboard", path: "/" }, { title: "Users" }],
  "/spending" : [{title: "Spedings", path: "/speding"}],
};

export default routes;
