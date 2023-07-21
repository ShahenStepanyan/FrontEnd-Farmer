import { useEffect, useState } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import UsersTable from "./UsersTable";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../services/users";
import { useTranslation } from "react-i18next";

import type { UserModel, UserType } from "../../types/User";
import UserForm from "./UserForm";

const Users = () => {
  const [users, setUsers] = useState([] as Array<UserModel>);
  const [formVisible, setFormVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserModel>();
  const { t } = useTranslation("users");
  
  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const closeForm = () => setFormVisible(false);

  const handleSubmit = async (values: UserType) => {
    try {
      if (!userToEdit) {
        const newUser = await createUser(values);
        
        users.push(newUser);
      } else {
        const updatedUser = await updateUser(userToEdit._id, values);
        const index = users.findIndex((item) => item._id === updatedUser._id);
        users[index] = updatedUser;
        setUserToEdit(undefined);
      }
      setUsers([...users]);
      closeForm();
    } catch (err: any) {
      if (err.code === 11000 && err.keyValue?.email) {
        throw new Error(t(`Email is already in use!`));
      }
      throw err;
    }
  };

  const handleUserDelete = async (user: UserModel) => {
    await deleteUser(user._id);
    setUsers((users) => users.filter((item) => item._id !== user._id));
  };

  return (
    <>
  
      <UserForm
        visible={formVisible}
        onCancel={closeForm}
        onOk={handleSubmit}
        title={t("Add")}
        initialValues={userToEdit}
      />
      
      <Button
        onClick={() => {
          setUserToEdit(undefined);
          setFormVisible(true);
        }}
        type="primary"
        icon={<PlusCircleOutlined />}
      >
        {t("Add")}
      </Button>
      <UsersTable
        data={users}
        onEdit={(user) => {
          setUserToEdit(user);
          setFormVisible(true);
        }}
        onDelete={handleUserDelete}
      />
    </>
  );
};

export default Users;
