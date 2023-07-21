import { useMemo, useEffect, useState, useContext } from "react";
import { Col, Divider, Modal, Row, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import AnimalForm from "../Animals/AnimalFormModal";
import AnimalCard from "./Card";
import DeregisterModal from "./DeregisterModal";
import Weight from "./Weight";
import { AnimalTypesContext } from "../../context/AnimalTypesContext";
import { AnimalContext } from "../../context/AnimalContext";
import animalsService from "../../services/animals";
import useScreenSize from "../../hooks/useScreenSize";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "./styles.less";

import type { AnimalModel } from "../../types/Animal";
import AnimalProblems from "./Problems";
import AnimalSickness from "./Sickness";

const { Title } = Typography;

const Animal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animalTypes } = useContext(AnimalTypesContext);
  const { animal, loading, updateAnimal } = useContext(AnimalContext);
  const [children, setChildren] = useState<Array<AnimalModel>>([]);
  const [siblings, setSiblings] = useState<Array<AnimalModel>>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [deregisterVisible, setDeregisterVisible] = useState(false);
  const [destroyVisible, setDestroyVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<AnimalModel>>();
  const { height } = useScreenSize();
  const { t } = useTranslation("animals");
 
  const animalType = useMemo(
    () =>
      animalTypes.find((animalType) => animalType._id === animal?.animalType),
    [animalTypes, animal]
  );
 
    
  useEffect(() => {
    if (!id) {
      return;
    }
    animalsService.find({ parent: id }).then(setChildren);
  }, [id]);

  useEffect(() => {
    if (!animal?.parent) {
      setSiblings([]);
      return;
    }
    animalsService
      .find({ parent: animal?.parent, _id: { $ne: animal._id } })
      .then(setSiblings);
  }, [animal?.parent, animal?._id]);

  const closeForm = () => setFormVisible(false);
  const closeDeregisterModal = () => setDeregisterVisible(false);

  const onFormOk: Parameters<typeof AnimalForm>[0]["onOk"] = async (values) => {
    if (initialValues?._id) {
      await updateAnimal(values);
    } else {
      const child = await animalsService.create(values);
      setChildren((children) => [...children, child]);
    }
    setFormVisible(false);
  };

  const handleDeregister = async (values: {
    deregisterReason: string;
    deregisterDate: string | moment.Moment;
    deregisterNote?: string;
    deregisterSubReason?: string;
  }) => {
    await animalsService.deregister(animal?._id as string, values);
    navigate("/animals");
  };

  const handleAnimalDestroy = async () => {
    if (!animal?._id) {
      return;
    }
    await animalsService.destroy(animal?._id);
    navigate("/animals");
  };

  const birthDate = useMemo(
    () => moment(animal?.birthDate as string),
    [animal?.birthDate]
  );

  return (
    <Spin spinning={loading}>
      <AnimalForm
        visible={formVisible}
        onOk={onFormOk}
        onCancel={closeForm}
        title={t(initialValues?._id ? "Edit animal" : "Add child")}
        initialValues={initialValues}
      />
      <DeregisterModal
        visible={deregisterVisible}
        onCancel={closeDeregisterModal}
        onOk={handleDeregister}
        birthDate={birthDate}
      />
    
      <Modal
        title={
          <Title level={3} style={{ marginBottom: 0 }}>
            {t("Attention!")}
          </Title>
        }
        visible={destroyVisible}
        okText={t("Yes")}
        okButtonProps={{ danger: true, type: "primary" }}
        onOk={handleAnimalDestroy}
        onCancel={() => setDestroyVisible(false)}
      >
        <Title level={4}>{t("This operation can not be undone!")}</Title>
        <Title level={4}>{t("Are you sure?")}</Title>
      </Modal>
      
      <div className="container" style={{ height: height - 112 }}>
        <div className="main-info">
          <Row>
            <Col xl={24} lg={24} xs={24}>
              <AnimalCard
                animal={animal}
                animalType={animalType?.name || ""}
                onEdit={() => {
                  setInitialValues({
                    ...animal,
                    birthDate,
                  });
                  setFormVisible(true);
                }}
                onDeregister={() => setDeregisterVisible(true)}
                onDestroy={() => setDestroyVisible(true)}
              />
            </Col>
          </Row>
          <Row>
            <Divider />
          
            <Col xl={24} lg={24} xs={24}>
              <Weight birthDate={birthDate} disabled={!!animal?.removed} />
              <AnimalProblems birthDate={birthDate} disabled={!!animal?.removed} />
              <AnimalSickness birthDate={birthDate} disabled={!!animal?.removed}/>
            </Col>
          </Row>
        </div>
        
        <Sidebar
          animal={animal}
          children={children}
          siblings={siblings}
          onAddChildren={() => {
            setFormVisible(true);
            setInitialValues({
              parent: animal?._id,
              animalType: animal?.animalType,
            });
          }}
        />
      </div>
    </Spin>
  );
};

export default Animal;
