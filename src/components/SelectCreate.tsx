import { useState } from "react";
import { Button, Input, Select, SelectProps } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const SelectCreate: React.FC<
  {
    onCreate: (value: string) => Promise<void>;
    createPlaceholder?: string;
  } & SelectProps
> = ({ onCreate, createPlaceholder, ...props }) => {
  const [newValue, setNewValue] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreate = async () => {
    setCreateLoading(true);
    await onCreate(newValue);
    setNewValue("");
    setCreateLoading(false);
  };

  return (
    <Select
      showSearch
      optionFilterProp="label"
      dropdownRender={(menu) => (
        <>
          {menu}
          <div style={{ padding: "4px 4px 0" }}>
            <Input
              placeholder={createPlaceholder}
              value={newValue}
              size="small"
              onChange={(e) => setNewValue(e.target.value)}
              suffix={
                <Button
                  icon={<PlusCircleOutlined />}
                  onClick={handleCreate}
                  type="link"
                  disabled={!newValue}
                  loading={createLoading}
                >
                  Create
                </Button>
              }
            />
          </div>
        </>
      )}
      {...props}
    />
  );
};

export default SelectCreate;
