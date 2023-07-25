import { useContext, useState } from "react";
import { Button, Card, Col, Row, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";
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
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import WeightForm from "./WeightForm";
import weightsService from "../../../services/weights";
import { AnimalContext } from "../../../context/AnimalContext";
import moment from "moment";
import { useTranslation } from "react-i18next";
import theme from "../../../utils/theme.json";

import type { Weight, WeightModel } from "../../../types/Weight";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnimalWeights = ({
  birthDate,
  disabled,
}: {
  birthDate: moment.Moment;
  disabled: boolean;
}) => {
  const { id } = useParams();
  const { weights, getAndSetWeights, getAndSetAnimal } = useContext(AnimalContext);
  const [weightToEdit, setWeightToEdit] = useState<WeightModel>();
  const [visible, setVisible] = useState(false);
  const [chartMode, setChartMode] = useState(false);
  const { t } = useTranslation("animals");

  const close = () => {
    setWeightToEdit(undefined);
    setVisible(false);
  };

  const handleWeightAdd = async (values: Weight) => {
    if (weightToEdit?._id) {
      await weightsService.update(weightToEdit._id, values);
    } else {
      await weightsService.create({ ...values, animal: id as string });
    }
    getAndSetWeights();
    getAndSetAnimal();
    close();
  };

  const onEdit = (item: WeightModel) => {
    setWeightToEdit({ ...item, date: moment(item.date) });
    setVisible(true);
  };

  return (
    <Row>
      <WeightForm
        onCancel={close}
        onOk={handleWeightAdd}
        visible={visible}
        initialValues={weightToEdit}
        birthDate={birthDate}
      />
      <Col style={{ width: "100%" }}>
        <Row style={{ justifyContent: "space-between", width: "100%" }}>
          <h2>{t("Weight")}</h2>
          <span>
            {t("Chart mode")}:{" "}
            <Switch checked={chartMode} onChange={setChartMode} />
          </span>
          <Button
            type="primary"
            disabled={disabled}
            onClick={() => setVisible(true)}
          >
            {t("Add")}
          </Button>
        </Row>
        <Row gutter={[4, 4]} style={{ width: "100%" }}>
          {chartMode ? (
            <Line
              style={{ height: 300, maxHeight: 300, minHeight: 300 }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
              data={{
                labels: weights.map((item) =>
                  moment(item.date).format("MMM DD YYYY")
                ),
                datasets: [
                  {
                    label: t("Weight"),
                    data: weights.map((item) => item.weight),
                    borderColor: theme["@primary-color"],
                  },
                ],
              }}
            />
          ) : (
            weights.map((item) => (
              <Card
                key={item._id}
                size="small"
                className="weight-card"
                title={item.weight}
                extra={
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    disabled={disabled}
                    onClick={() => onEdit(item)}
                  />
                }
              >
                {moment(item.date).format("MMM DD YYYY")}
              </Card>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default AnimalWeights;
