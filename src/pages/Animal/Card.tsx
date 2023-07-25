import InfoItem from "./InfoItem";

import { Button, Card } from "antd";
import { CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./styles.less";

import type { AnimalModel } from "../../types/Animal";
import { useEffect, useState } from "react";
import selectFieldService from "../../services/selectFields";
import selectSubFieldsService from "../../services/selectSubFields";
import animalSubTypeService from "../../services/animalSub";
import {
  AnimalSubTypes,
  AnimalSubTypesModel,
} from "../../types/AnimalSubTypes";

const AnimalCard = ({
  animal,
  animalType,
  onEdit,
  onDeregister,
  onDestroy,
}: {
  animal?: AnimalModel;
  animalType: string;
  onEdit: () => void;
  onDeregister: () => void;
  onDestroy: () => void;
}) => {
  const { t } = useTranslation("animals");
  const [selectFields, setSelectFields] = useState<AnimalModel[]>([]);
  const [animalsSub, setAnimalsSub] = useState<AnimalSubTypes[]>([]);
  const [selectSubFields, setSelectSubFields] = useState<AnimalSubTypesModel[]>(
    []
  );
  useEffect(() => {
    const result: any = [];
    selectFieldService.find().then((data) =>
      data.map((values) => {
        if (values.type === "deregister") {
          result.push(values);
          return setSelectFields(result);
        }
        return "";
      })
    );
  }, []);
  useEffect(() => {
    selectSubFieldsService.find().then(setSelectSubFields);
  }, []);
  useEffect(() => {
    animalSubTypeService.find().then(setAnimalsSub);
  }, []);
;
  return (
    <Card
      size="small"
      title={`${animalType} ${Number(animal?.serialNumber) || ""}`}
      extra={
        <>
          <Button
            icon={<EditOutlined />}
            disabled={animal?.removed}
            className="edit-animal-button"
            onClick={onEdit}
          />
          <Button
            danger
            icon={<CloseOutlined />}
            disabled={animal?.removed}
            className="deregister-animal-button"
            onClick={onDeregister}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            className="destroy-animal-button"
            onClick={onDestroy}
          />
        </>
      }
      style={{ height: "100%" }}
    >
      <InfoItem title="Gender" info={t(animal?.gender || "")} />
      <InfoItem title="Weight" info={animal?.weight} />
      {animal?.birthDate && (
        <InfoItem
          title="Birth date"
          info={new Date(animal.birthDate as string).toDateString()}
        />
      )}
      <InfoItem
        title="Sub Types"
        info={`${
          animalsSub.find((value) => value._id === animal?.subTypes)?.name
        }`}
      />

      {animal?.deregisterDate && (
        <InfoItem
          title="Deregister date"
          info={new Date(animal.deregisterDate as string).toDateString()}
        />
      )}
      {animal?.deregisterDate && (
        <InfoItem
          title="deregisterReason"
          info={`${
            selectFields.find((value) => value._id === animal?.deregisterReason)
              ?.name
          }`}
        />
      )}
      {animal?.deregisterDate && (
        <InfoItem
          title="deregisterSubReason"
          info={`${
            selectSubFields.find(
              (value) => value._id === animal?.deregisterSubReason
            )?.name
          }`}
        />
      )}
    </Card>
  );
};

export default AnimalCard;
