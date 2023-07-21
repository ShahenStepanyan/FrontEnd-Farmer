import { useContext } from "react";
import { useRoutes } from "react-router-dom";

import { UserContext } from "../context/UsersContext";
import routes from "./routes";

const Router = () => {
  const { user } = useContext(UserContext);
  const content = useRoutes(
    routes.map((route) => ({
      ...route,
      children:
        route.children &&
        route.children.filter(
          ({ roles }) =>
            !roles?.length || (user?.role && roles.includes(user.role))
        ),
    }))
  );

  return content;
};

export default Router;
