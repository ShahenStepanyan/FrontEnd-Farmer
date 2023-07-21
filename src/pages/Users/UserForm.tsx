import { Form, Input, Select } from "antd";
import ModalForm from "../../components/ModalForm";
import { useTranslation } from "react-i18next";
import { RoleEnum } from "../../types/User";

import type { UserType } from "../../types/User";
import type { ModalFormProps } from "../../components/ModalForm";

const FormItem = Form.Item;

const UserForm = ({
  visible,
  onCancel,
  title,
  onOk,
  initialValues,
}: Omit<ModalFormProps<UserType>, "children">) => {
  const { t } = useTranslation("animals");

  return (
    <ModalForm<UserType>
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      initialValues={initialValues}
    >
      <FormItem
        name="email"
        label={t("Email")}
        rules={[
          {
            type: "email",
            message: t("The input is not valid E-mail!"),
          },
          {
            required: true,
            message: t("Please input your E-mail!"),
          },
        ]}
      >
        <Input />
      </FormItem>
      <FormItem name="role" label={t("Role")} required>
        <Select
          disabled={initialValues?.role === RoleEnum.ADMIN}
          options={Object.values(RoleEnum).map((role) => ({
            label: t(role),
            value: role,
          }))}
        />
      </FormItem>
      <FormItem name="firstName" label={t("First Name")} required>
        <Input />
      </FormItem>
      <FormItem name="lastName" label={t("Last Name")} required>
        <Input />
      </FormItem>
      {!initialValues && (
        <FormItem
          name="password"
          label={t("Password")}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password autoComplete="new-password" />
        </FormItem>
      )}
    </ModalForm>
  );
};

export default UserForm;
