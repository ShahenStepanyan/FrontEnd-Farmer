import { DatePicker, Form, InputNumber } from "antd";
import ModalForm, { ModalFormProps } from "../../../components/ModalForm";
import { useTranslation } from "react-i18next";
import moment from "moment";

import type { Weight } from "../../../types/Weight";

const WeightForm = ({
  onCancel,
  onOk,
  visible,
  initialValues,
  birthDate,
}: Omit<ModalFormProps<Weight>, "children" | "title"> & {
  birthDate: moment.Moment;
}) => {
  const { t } = useTranslation("animals");
 
  return (
    <ModalForm
      title={t("Add weight")}
      onCancel={onCancel}
      onOk={onOk}
      visible={visible}
      initialValues={{ date: moment(), ...initialValues }}
    >
      <Form.Item
        name="weight"
        label={t("Weight")}
        rules={[{ required: true, message: t('Please fill the "weight"') }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name="date"
        label={t("Date")}
        rules={[{ required: true, message: t('Please fill the "date"') }]}
      >
        <DatePicker
          disabledDate={(date) => moment() < date || birthDate > date}
        />
      </Form.Item>
    </ModalForm>
  );
};

export default WeightForm;
