import { Button, Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./styles.less";

import { RoleEnum, UserModel } from "../../types/User";

type UsersTableProps = {
  data: Array<UserModel>;
  onEdit: (item: UserModel) => void;
  onDelete: (item: UserModel) => void;
};

const UsersTable = ({ data, onEdit, onDelete }: UsersTableProps) => {
  const { t } = useTranslation("users");

  return (
    <Table
      className="users-table"
      rowKey="_id"
      columns={[
        {
          title: t("Name"),
          render: (_value, record) => `${record.firstName} ${record.lastName}`,
        },
        {
          title: t("Role"),
          dataIndex: "role",
        },
        {
          title: t("Email"),
          dataIndex: "email",
        },
        {
          title: t("Actions"),
          render: (_, record) => (
            <>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={() => onEdit(record)}
              />
              <Popconfirm
                title={t("Delete this user?")}
                onConfirm={() => onDelete(record)}
                disabled={record.role === RoleEnum.ADMIN}
              >
                <Button
                  ghost
                  danger
                  icon={<DeleteOutlined />}
                  disabled={record.role === RoleEnum.ADMIN}
                />
              </Popconfirm>
            </>
          ),
        },
      ]}
      dataSource={data}
    />
  );
};
export default UsersTable;
