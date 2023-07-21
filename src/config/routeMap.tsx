import Dashboard from "../pages/Dashboard";

export default [
  {
    path: "/dashboard",
    component: <Dashboard />,
    roles: ["admin", "editor", "guest"],
  },
  // { path: "/animal-types", component: AnimalTypes, roles: ["admin","editor","guest"] },
  // { path: "/user", component: User, roles: ["admin"] },
];
