import { Form, Input } from "antd";
import ModalForm, { ModalFormProps } from "./ModalForm";

const AnimalModalForm: <T = Record<string, any>>(
  props: ModalFormProps<T>
) => JSX.Element = (props) => {
  return (
    <ModalForm {...props}>
      <Form.Item>
        <Input />
      </Form.Item>
    </ModalForm>
  );
};

export default AnimalModalForm;
