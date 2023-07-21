import { useEffect } from "react";
import { Form } from "antd";

import type { FormInstance } from "antd";

type MFFormProps<T> = {
  init: (form: FormInstance<T>) => void;
  initialValues?: Partial<T>;
  children: React.ReactNode;
};

function MFForm<T>({ init, initialValues, children }: MFFormProps<T>) {
  const [form] = Form.useForm<T>();

  useEffect(() => {
    init(form);
  }, [form, init]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      scrollToFirstError
    >
      {children}
      
    </Form>
  );
}

export default MFForm;
