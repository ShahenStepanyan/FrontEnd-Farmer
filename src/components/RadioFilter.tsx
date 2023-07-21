import { Button, Card, Radio, Space } from "antd";

import type { FilterDropdownProps } from "antd/lib/table/interface";

const RadioFilter = (
  props: FilterDropdownProps & {
    value?: string;
    onReset: () => void;
    onChange: (value: string) => void;
    options: Array<{ label: string; value: string }>;
  }
) => (
  <Card
    size="small"
    className="filter-card"
    actions={[
      <Button
        key="reset"
        size="small"
        type="link"
        onClick={() => {
          props.onReset();
          props.confirm();
        }}
      >
        Reset
      </Button>,
    ]}
  >
    <Radio.Group
      value={props.value}
      name="gender"
      onChange={(e) => {
        props.onChange(e.target.value);
        props.confirm();
      }}
    >
      <Space direction="vertical">
        {props.options.map((item) => (
          <Radio key={item.value} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  </Card>
);

export default RadioFilter;
