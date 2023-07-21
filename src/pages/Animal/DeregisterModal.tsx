import { useContext, useMemo, useState } from "react";
import { DatePicker, Form, Input, Spin } from "antd";
import ModalForm from "../../components/ModalForm";
import SelectCreate from "../../components/SelectCreate";
import { SelectFieldsContext } from "../../context/SelectFieldsContext";
import { useTranslation } from "react-i18next";
import { SelectFieldTypeEnum } from "../../types/SelectField";
import moment from "moment";

import type { FormInstance } from "antd";
import type { ModalFormProps } from "../../components/ModalForm";
import type { SelectFieldAndSubFields } from "../../types/SelectField";

type DeregisterModalProps = Omit<
  ModalFormProps<{
    deregisterReason: string;
    deregisterDate: string | moment.Moment;
    deregisterNote?: string;
    deregisterSubReason?: string;
  }>,
  "title" | "children"
> & { birthDate: moment.Moment };

const DeregisterModal = (props: DeregisterModalProps) => {
  const { selectFields, addItem, addSubField } =
    useContext(SelectFieldsContext);
  const deregisterFields = useMemo(
    () =>
      selectFields
        .filter((item) => item.type === SelectFieldTypeEnum.DEREGISTER)
        .map((item) => ({
          label: item.name,
          value: item._id,
        })),
    [selectFields]
  );
  const [selectedReason, setSelectedReason] =
    useState<SelectFieldAndSubFields>();
  const [spinning, setSpinning] = useState(false);
  const [form, setForm] = useState<FormInstance>();
  const { t } = useTranslation("animals");

  const handleDeregisterReasonCreate = async (value: string) => {
    setSpinning(true);
    const newReason = await addItem({
      name: value,
      type: SelectFieldTypeEnum.DEREGISTER,
      subFieldIsRequired: false,
    });
    setSelectedReason({ ...newReason, subFields: [] });
    form?.setFieldsValue({ deregisterReason: newReason._id });
    setSpinning(false);
  };

  const handleSubFieldCreate = async (value: string) => {
    if (!selectedReason) {
      return;
    }
    setSpinning(true);
    const subField = await addSubField({
      name: value,
      selectField: selectedReason._id,
    });
    setSelectedReason({
      ...selectedReason,
      subFields: [...selectedReason.subFields, subField],
    });
    setSpinning(false);
  };

  return (
    <ModalForm
      title={t("Deregister")}
      initialValues={{ deregisterDate: moment() }}
      initForm={setForm}
      {...props}
    >
      <Spin spinning={spinning}>
        <Form.Item
          name="deregisterReason"
          label={t("Deregister Reason")}
          rules={[{ required: true, message: t("Reason is required!") }]}
        >
          <SelectCreate
            onCreate={handleDeregisterReasonCreate}
            placeholder={t("Select Reason")}
            createPlaceholder={t("New Reason")}
            onChange={(value) =>
              setSelectedReason(selectFields.find((item) => item._id === value))
            }
            options={deregisterFields}
          />
        </Form.Item>
        <Form.Item
          name="deregisterSubReason"
          label={t("Deregister Sub Reason")}
          rules={[
            {
              required: selectedReason?.subFieldIsRequired,
              message: t("Deregister Sub Reason is required!"),
            },
          ]}
        >
          <SelectCreate
            disabled={!selectedReason}
            onCreate={handleSubFieldCreate}
            placeholder={t("Select Deregister Sub Reason")}
            createPlaceholder={t("New {{fieldName}} Sub Reason", {
              fieldName: selectedReason?.name,
            })}
            options={selectedReason?.subFields.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="deregisterDate"
          label={t("Deregister date")}
          rules={[
            { required: true, message: t("Deregister date is required!") },
          ]}
        >
          <DatePicker
            disabledDate={(date) => moment() < date || props.birthDate > date}
          />
        </Form.Item>
        <Form.Item name="deregisterNote" label={t("Note")}>
          <Input.TextArea placeholder={t("Leave a note")} />
        </Form.Item>
      </Spin>
    </ModalForm>
  );
};

export default DeregisterModal;
