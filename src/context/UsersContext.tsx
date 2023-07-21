import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  login as loginApi,
  // logout as logoutApi,
} from "../services/users";
import { setToken, revokeToken } from "../utils";

import type { UserType } from "../types/User";

const defaultValue: {
  user?: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} = {
  login: async () => {},
  logout: async () => {},
};

export const UserContext = React.createContext(defaultValue);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useLocalStorage<UserType | null>("current-user");

  const login = async (email: string, password: string) => {
    const user = await loginApi(email, password);
    setToken(user.token);
    setUser(user);
  };

  const logout = async () => {
    // await logoutApi();
    setUser(null);
    revokeToken();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
