import { useEffect, useState } from "react";
import { Button, Switch } from "antd";
import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import AnimalsTable from "./AnimalsTable";
import AnimalForm from "./AnimalFormModal";
import animalsService from "../../services/animals";
import { useTranslation } from "react-i18next";
import type { QueryProps } from "../../types";
import type { Animal, AnimalModel } from "../../types/Animal";

const limit = 10;

const sortDirections = {
  ascend: "asc",
  descend: "desc",
};

function Animals() {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formDeregisterVisible, setFormDeregisterVisible] =
    useState<boolean>(false);
  const [animals, setAnimals] = useState<Array<AnimalModel>>([]);
  const [filters, setFilters] = useState<QueryProps<AnimalModel>>({});
  const [pageIndex, setPageIndex] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartMode, setChartMode] = useState(false);
  const [showDeregistered, setShowDeregistered] = useState(false);
  const { t } = useTranslation("animals");

  useEffect(() => {
    setLoading(true);
    animalsService
      .find({
        ...filters,
        skip: (pageIndex - 1) * limit,
        limit,
        total: true,
        removed: showDeregistered,
      })
      .then(({ data, total }) => {
        setAnimals(data);
        setTotal(total);
        if (limit * (pageIndex - 1) > total) {
          setPageIndex(1);
        }
      })
      .finally(() => setLoading(false));
  }, [pageIndex, filters, showDeregistered]);

  const closeForm = () => setFormVisible(false);
  const closeDeregisterForm = () => setFormDeregisterVisible(false);

  const handleSubmit = async (values: Animal) => {
    try {
      const newAnimal = await animalsService.create(values);

      setAnimals((animals) => [...animals, newAnimal]);
      closeForm();
    } catch (err: any) {
      if (err.code === 11000 && err.keyValue?.serialNumber) {
        throw new Error(t(`Serial number is already in use!`));
      }
      throw err;
    }
  };

  const array: string[] = [];
  animals.map((value) => array.push(value.animalType));
  return (
    <>
      <AnimalForm
        visible={formVisible}
        onCancel={closeForm}
        onOk={handleSubmit}
        title={t("Add")}
      />

      <div className="actions-container">
        {chartMode ? (
          <Button
            onClick={() => setFormDeregisterVisible(true)}
            danger
            icon={<CloseOutlined />}
          >
            {t("Deregister")}
          </Button>
        ) : (
          <Button
            onClick={() => setFormVisible(true)}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            {t("Add")}
          </Button>
        )}
        <div>
          {t("Select to deregister:")}{" "}
          <Switch checked={chartMode} onChange={setChartMode} />
          {t("Show deregistered:")}{" "}
          <Switch checked={showDeregistered} onChange={setShowDeregistered} />
        </div>
      </div>
      <AnimalsTable
        onCancel={closeDeregisterForm}
        visible={formDeregisterVisible}
        changeValue={chartMode}
        data={animals}
        limit={limit}
        page={pageIndex}
        total={total}
        onFilterChange={setFilters}
        // @ts-ignore
        filters={filters}
        onChange={(pagination, _filters, sorter) => {
          if (pagination.current) {
            setPageIndex(pagination.current);
          }
          const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter;
          setFilters((filters) => ({
            ...filters,
            sort: {
              [field as string]: order ? sortDirections[order] : undefined,
            },
          }));
        }}
        loading={loading}
      />
    </>
  );
}

export default Animals;
