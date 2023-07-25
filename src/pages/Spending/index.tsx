import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import moment from "moment";
import { t } from "i18next";
import { SpendingEventsType } from "../../types/SpendingEventsType";
import { QueryProps } from "../../types";
import spendingsService from "../../services/spendings";
import ModalForm from "../../components/ModalForm";
import selectFieldService from "../../services/selectFields";
import FullCalendar from "@fullcalendar/react";
import { SelectField } from "../../types/SelectField";

function Calendar() {
  const [events, setEvents] = useState<SpendingEventsType[]>([]);
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false);
  const [formChangeModalVisible, setFormChangeModalVisible] =
    useState<boolean>(false);
  const [selectFields, setSelectFields] = useState<SelectField[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedEventInfo, setSelectedEventInfo] =
    useState<SpendingEventsType>();
  
  const [filtersSpendings] = useState<QueryProps<SpendingEventsType>>({});
  moment.suppressDeprecationWarnings = true;


  
  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formModalVisible, formChangeModalVisible]);

  useEffect(() => {
    loadSelectFields();
  }, []);

  const loadEvents = async () => {
    const eventData = await spendingsService.find({ ...filtersSpendings });
    setEvents(eventData);
  };

  const loadSelectFields = async () => {
    const fieldsData = await selectFieldService.find();
    const spendingFields = fieldsData.filter(
      (value) => value.type === "spending"
    );
    setSelectFields(spendingFields);
  };

  const handleAdd = async (values: SpendingEventsType) => {
    spendingsService.create(values);
    setFormModalVisible(false);
  };

  const handleDelete = async () => {
    spendingsService.destroy(selectedEventId);
    setFormChangeModalVisible(false);
    setSelectedEventId("");
  };

  const handleEditForm = async (eventId: string) => {
    setSelectedEventId(eventId);
    const eventData = await spendingsService.findById(eventId);
    setSelectedEventInfo(eventData);
    setFormChangeModalVisible(true);
  };

  const handleUpdate = async (values: Object) => {
    spendingsService.update(selectedEventId, values);
    setFormChangeModalVisible(false);
  };

  const handleDateClick = (arg: any) => {
    handleEditForm(arg.event.id);
  };
 

  return (
    <>
      <Button
        onClick={() => setFormModalVisible(true)}
        type="primary"
        icon={<PlusCircleOutlined />}
      >
        {t("Add Spending")}
      </Button>

      <ModalForm
        title={t("Add")}
        visible={formModalVisible}
        onCancel={() => {
          setFormModalVisible(false);
        }}
        onOk={handleAdd}
        
      >
        <Form.Item
          name={"amount"}
          rules={[{ required: false, message: t("Name is required!") }]}
        >
          <Input type="number" placeholder={t("Amount")} />
        </Form.Item>
        <Form.Item
          name={"date"}
          rules={[{ required: false, message: t("Name is required!") }]}
        >
          <Input type="date" placeholder={t("Date")} />
        </Form.Item>
        <Form.Item name={"type"}>
          <Select
           
            options={selectFields.map((value) => ({
              value: value._id,
              label: value.name,
            }))}
          />
        </Form.Item>
      </ModalForm>

      <ModalForm
        title={t("Info Update")}
        visible={formChangeModalVisible}
        onOk={handleUpdate}
        onCancel={() => {
          setSelectedEventId("");
          setFormChangeModalVisible(false);
        }}
      >
        <Form.Item
          name={"amount"}
          rules={[{ required: false, message: t("Name is required!") }]}
        >
          <Input
            type="number"
            value={selectedEventInfo?.amount}
            placeholder={selectedEventInfo?.amount}
          />
        </Form.Item>
        <h4>Date: {selectedEventInfo?.date}</h4>
        <Form.Item
          name={"date"}
          rules={[{ required: false, message: t("Name is required!") }]}
        >
          <Input type="date" placeholder={selectedEventInfo?.date} />
        </Form.Item>
        <h4>
          Type:{" "}
          {
            selectFields.find((value) => value._id === selectedEventInfo?.type)
              ?.name
          }
        </h4>
        <Form.Item name={"type"}>
          <Select
           
            options={selectFields.map((value) => ({
              value: value._id,
              label: value.name,
            }))}
          />
        </Form.Item>

        <Button onClick={handleDelete}>Delete</Button>
      </ModalForm>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={handleDateClick}
        events={events.map((event) => ({
          id: event._id,
          title: `${event.amount} ${
            selectFields.find((value) => value._id === event.type)?.name
          }`,
          start: moment(event.date).toDate(),
          end: moment(event.date).toDate(),
        }))}
      />
    </>
  );
}

export default Calendar;
