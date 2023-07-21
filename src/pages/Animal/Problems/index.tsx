import { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Row, Modal, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "react-router-dom";
import { AnimalContext } from "../../../context/AnimalContext";
import moment from "moment";
import { useTranslation } from "react-i18next";
import animalProblemsService from "../../../services/animalsProblems";
import type { Weight, WeightModel } from "../../../types/Weight";
import selectFieldService from "../../../services/selectFields";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnimalProblems = ({
  birthDate,
  disabled,
}: {
  birthDate: moment.Moment;
  disabled: boolean;
}) => {
  const { id } = useParams();
  const { animal, getAndSetWeights, getAndSetAnimal } =
    useContext(AnimalContext);
  const [animalProblems, setAnimalProblems] = useState<any[]>([]);
  const [selectField, setSelectField] = useState<any[]>([]);
  const [weightToEdit, setWeightToEdit] = useState<WeightModel>();
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [forDelete, setForDelete] = useState(false)
  const [data, setData] = useState<any>({});
  const { t } = useTranslation("animals");

  useEffect(() => {
    const result: any[] = [];
    animalProblemsService.find({ type: "problem" }).then((value) => {
      value.map((item) => {
        if (item.animal === id) {
          result.push(item);
        }
      });
      setAnimalProblems(result);
      setForDelete(false)
    });
  }, [isModalOpen,forDelete]);

  useEffect(() => {
    selectFieldService.find({ type: "problem" }).then(setSelectField);
    setForDelete(false)
  }, [isModalOpen, forDelete]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    animalProblemsService.create(data);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: string) => {
    const newDate = new Date();
    setData({
      animal: id,
      problem: value,
      type: "problem",
      date: newDate,
      onBirth: false,
    });
  };


  return (
    <div style={{marginTop: "30px", marginBottom: "30px"}}>
       <Row>
      <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Select
          defaultValue="Problems"
          style={{ width: 120 }}
          onChange={handleChange}
          options={selectField.map((item) => {
            return { value: item._id, label: item.name };
          })}
        />
      </Modal>

      <Col style={{ width: "100%" }}>
        <Row style={{ justifyContent: "space-between", width: "100%" }}>
          <h2>{t("Problems")}</h2>

          <Button type="primary" disabled={disabled} onClick={showModal}>
            {t("Add")}
          </Button>
        </Row>
        <Row gutter={[4, 4]} style={{ width: "100%" }}>
          {animalProblems.map((item) => (
            <Card
              key={item._id}
              size="small"
              className="weight-card"
              title={`onBirth 
                 ${item.onBirth}`}
              extra={
                <Button
                  size="small"
                  icon={<DeleteOutlined />}
                  disabled={disabled}
                  onClick={() => {
                    animalProblemsService.destroy(item._id);
                    setForDelete(true)
                  }}
                />
              }
            >
              {selectField.map((value) => {
                if (value._id === item.problem) {
                  return value.name;
                }
              })}
            </Card>
          ))}
        </Row>
      </Col>
    </Row>
    </div> 
  );
};

export default AnimalProblems;
