import { Button, Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useScreenSize from "../../../hooks/useScreenSize";
import { useTranslation } from "react-i18next";
import "../styles.less";

import type { SelectFieldModel } from "../../../types/SelectField";

type SelectFieldsListProps = {
  data: Array<SelectFieldModel>;
  onEdit: (item: SelectFieldModel) => void;
  onDelete: (item: SelectFieldModel) => void;
};

const DeathReasonsList = ({
  data,
  onEdit,
  onDelete,
}: SelectFieldsListProps) => {
  const { height } = useScreenSize();
  const { t } = useTranslation("selectFields");

  return (
    <Table
      className="select-fields-table"
      rowKey="_id"
      dataSource={data}
      scroll={{ y: height - 236 }}
      pagination={false}
      columns={[
        {
          title: t("Name"),
          dataIndex: "name",
          key: "name",
        },
        {
          title: "",
          dataIndex: "actions",
          key: "actions",
          render: (_value, row) => (
            <>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={() => onEdit(row)}
              />
              <Popconfirm
                title={t("Are you sure?")}
                onConfirm={() => onDelete(row)}
              >
                <Button icon={<DeleteOutlined />} danger ghost />
              </Popconfirm>
            </>
          ),
        },
      ]}
    />
  );
};

export default DeathReasonsList;
