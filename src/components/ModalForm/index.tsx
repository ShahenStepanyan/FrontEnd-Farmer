import { Modal, FormInstance, message } from "antd";
import { useState } from "react";
import MFForm from "./Form";

export type ModalFormProps<T> = {
  title: string;
  visible: boolean;
  onCancel: () => void;
  onOk: (values: T) => Promise<void>;
  children: React.ReactNode;
  initialValues?: Partial<T>;
  initForm?: (form: FormInstance<T>) => void;
};

const ModalForm: <T = Record<string, any>>(
  props: ModalFormProps<T>
) => JSX.Element = ({
  title,
  visible,
  onCancel,
  onOk,
  children,
  initialValues,
  initForm,
}) => {
  const [form, setForm] = useState<FormInstance<Parameters<typeof onOk>[0]>>();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form) {
      return;
    }
    form
      .validateFields()
      .then((values) => {
        if (!values) {
          return;
        }
        setConfirmLoading(true);
        onOk(values)
          .then((_response) => {
            setConfirmLoading(false);
          })
          .catch((error) => {
            message.error(error.message);
          })
          .finally(() => setConfirmLoading(false));
      })
      .catch((err) => {
        console.log("Form submitting error", err);
        /** Do not need this scroll functionality since `scrollToFirstError` in `./Form.tsx` */
        // form.scrollToField(errorFields?.[0]?.name);
      });
  };

  const handleInit = (value: typeof form) => {
    setForm(value);
    value && initForm && initForm(value);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      destroyOnClose
    >
      <MFForm init={handleInit} initialValues={initialValues}>
        {children}
      </MFForm>
    </Modal>
  );
};

export default ModalForm;
