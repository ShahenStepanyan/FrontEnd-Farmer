import { useState, useEffect } from "react";
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
import moment from "moment";
import { useTranslation } from "react-i18next";
import animalProblemsService from "../../../services/animalsProblems";
import selectFieldService from "../../../services/selectFields";
import { AnimalSubTypes } from "../../../types/AnimalSubTypes";
import { Problem } from "../../../types/Problem";

interface AnimalProblemData {
  animal: string;
  problem: string;
  type: string;
  date: Date;
  onBirth:  boolean;
  name: string;
  _id: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnimalSickness = ({
  birthDate,
  disabled,
}: {
  birthDate: moment.Moment;
  disabled: boolean;
}) => {
  const { id } = useParams();
  const [animalProblems, setAnimalProblems] = useState<Problem[]>([]);
  const [selectField, setSelectField] = useState<AnimalSubTypes[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [forDelete, setForDelete] = useState(false);
  const [data, setData] = useState<AnimalProblemData>({
    animal: "",
    problem: "",
    type: "",
    date: new Date(),
    onBirth: false,
    name: "",
    _id: ""
  });
  const { t } = useTranslation("animals");

  useEffect(() => {
    const result: Problem[] = [];
    animalProblemsService
      .find({ type: "sickness" })
      .then((value) => {
        value.forEach((item) => {
          if (item.animal === id) {
            result.push(item);
          }
          
        });
        setAnimalProblems(result);
        setForDelete(false);
      })
      .catch((error) => {});
  }, [isModalOpen, forDelete, id]);

  useEffect(() => {
    selectFieldService.find({ type: "sickness" }).then(setSelectField);
    setForDelete(false);
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
      animal: id || "",
      problem: value,
      type: "sickness",
      date: newDate,
      onBirth: false,
      name: "",
      _id: ""
    });
  };

  return (
    <Row>
      <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Select
          defaultValue="Sickness"
          style={{ width: 120 }}
          onChange={handleChange}
          options={selectField.map((item) => {
            return { value: item._id, label: item.name };
          })}
        />
      </Modal>

      <Col style={{ width: "100%" }}>
        <Row style={{ justifyContent: "space-between", width: "100%" }}>
          <h2>{t("Sickness")}</h2>

          <Button type="primary" disabled={disabled} onClick={showModal}>
            {t("Add")}
          </Button>
        </Row>
        <Row gutter={[4, 4]} style={{ width: "100%" }}>
          {animalProblems.map((item: any) => (
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
                    setForDelete(true);
                  }}
                />
              }
            >
              {selectField.map((value) => {
                if (value._id === item.problem) {
                  return value.name;
                }else {return ""}
              })}
            </Card>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AnimalSickness;
