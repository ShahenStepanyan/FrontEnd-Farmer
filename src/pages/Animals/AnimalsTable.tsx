import { useContext, useRef, useEffect, useState } from "react";
import { Button, Table, Select, Form, Input, TableProps } from "antd";
import { FilterFilled, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RadioFilter from "../../components/RadioFilter";
import { AnimalTypesContext } from "../../context/AnimalTypesContext";
import useKeyBy from "../../hooks/useKeyBy";
import { useTranslation } from "react-i18next";
import { AnimalModel, GenderEnum } from "../../types/Animal";
import "./styles.less";
import ModalForm from "../../components/ModalForm";
import animalsService from "../../services/animals";
import selectFieldService from "../../services/selectFields";
import selectSubFieldsService from "../../services/selectSubFields";
import { SelectField } from "../../types/SelectField";
import { AnimalSubTypes } from "../../types/AnimalSubTypes";

const AnimalsTable = ({
  onCancel,
  visible,
  changeValue,
  data,
  page,
  filters,
  onFilterChange,
  limit,
  total,
  onChange,
  loading,
}: {
  data: Array<AnimalModel>;
  filters: Partial<AnimalModel>;
  onFilterChange: (filter: Partial<AnimalModel>) => void;
  page: number;
  limit: number;
  total: number;
  onChange: TableProps<AnimalModel>["onChange"];
  loading: boolean;
  changeValue: boolean;
  visible: any;
  onCancel: any;
}) => {
  const { animalTypes } = useContext(AnimalTypesContext);
  const [selectFields, setSelectFields] = useState<SelectField[]>([]);
  const [animalsSubFields, setAnimalsSubFields] = useState<AnimalSubTypes[]>(
    []
  );
  const navigate = useNavigate();
  const { t } = useTranslation("animals");

  const animalTypesMap = useKeyBy(animalTypes, "_id");

  const handleFilterReset = (name: keyof AnimalModel) => {
    const newFilters = { ...filters };
    delete newFilters[name];
    onFilterChange(newFilters);
  };

  useEffect(() => {
    selectSubFieldsService.find().then(setAnimalsSubFields);
  }, []);
  const result = useRef<string[]>([]);
  const handleSubmit = async (value: any) => {
    result.current.map(async (id: string) => {
      animalsService.deregister(id, value);
      onCancel = false;
    });
  };
  useEffect(() => {
    const count: any[] = [];
    selectFieldService.find().then((data) =>
      data.map((values) => {
        if (values.type === "deregister") {
          count.push(values);
          return setSelectFields(count);
        } else {
          return "";
        }
      })
    );
  }, []);

  return (
    <>
      <ModalForm
        title={t("Add")}
        visible={visible}
        onCancel={onCancel}
        onOk={handleSubmit}
      >
        <Form.Item name={"deregisterReason"}>
          <Select
            options={selectFields.map((value) => {
              return { value: value._id, label: value.name };
            })}
          ></Select>
        </Form.Item>
        <Form.Item name={"deregisterSubReason"}>
          <Select
            options={animalsSubFields.map((value) => {
              return { value: value._id, label: value.name };
            })}
          ></Select>
        </Form.Item>
        <Form.Item name={"deregisterDate"}>
          <Input type="date" placeholder={t("Date")} />
        </Form.Item>
      </ModalForm>

      <Table
        className="animals-table"
        rowKey="_id"
        onRow={({ _id }) => ({
          onClick: () => {
            if (changeValue === false) {
              navigate(`/animals/${_id}`);
            }
          },
        })}
        rowClassName="animals-table-row"
        rowSelection={
          changeValue
            ? {
                type: "checkbox",
                onSelect: (record) => {
                  result.current.push(record._id);
                },
              }
            : undefined
        }
        pagination={{
          current: page,
          total,
          pageSize: limit,
        }}
        onChange={onChange}
        loading={loading}
        columns={[
          {
            title: t("Serial Number"),
            dataIndex: "serialNumber",
            sorter: true,
            render: (value) => (changeValue ? Number(value) : Number(value)),
          },
          {
            title: t("Animal Type"),
            dataIndex: "animalType",
            render: (value) => animalTypesMap[value]?.name,
            filterIcon: !filters.animalType ? (
              <FilterOutlined />
            ) : (
              <FilterFilled />
            ),
            filterDropdown: (props) => (
              <RadioFilter
                {...props}
                options={animalTypes.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
                value={filters.animalType}
                onChange={(animalType) =>
                  onFilterChange({ ...filters, animalType })
                }
                onReset={() => handleFilterReset("animalType")}
              />
            ),
          },
          {
            title: t("Weight"),
            dataIndex: "weight",
            sorter: true,
          },
          {
            title: t("Gender"),
            dataIndex: "gender",
            render: (value) => t(value),
            filterIcon: !filters.gender ? <FilterOutlined /> : <FilterFilled />,
            filterDropdown: (props) => (
              <RadioFilter
                {...props}
                options={[
                  { value: GenderEnum.MALE, label: t(GenderEnum.MALE) },
                  { value: GenderEnum.FEMALE, label: t(GenderEnum.FEMALE) },
                ]}
                value={filters.gender}
                onChange={(gender) =>
                  onFilterChange({ ...filters, gender: gender as GenderEnum })
                }
                onReset={() => handleFilterReset("gender")}
              />
            ),
          },
          {
            title: t("Parent"),
            dataIndex: "parentNumber",
            render: (value, record) => (
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/animals/${record.parent}`);
                }}
              >
                {Number(value)}
              </Button>
            ),
          },
          {
            title: t("Father"),
            dataIndex: "fatherNumber",
            render: (value, record) => (
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/animals/${record.father}`);
                }}
              >
                {Number(value)}
              </Button>
            ),
          },
        ]}
        dataSource={data}
      />
    </>
  );
};
export default AnimalsTable;
