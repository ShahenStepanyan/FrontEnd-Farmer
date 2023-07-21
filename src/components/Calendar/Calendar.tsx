import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space } from "antd";
import type { QueryProps } from "../../types";
import moment from "moment";
import spendingsService from "../../services/spendings";
import ModalForm from "../ModalForm";
import { SpendingEventsType } from "../../types/SpendingEventsType";
import { t } from "i18next";
import selectFieldService from "../../services/selectFields";

function Calendar() {
  const [event, setEvent] = useState<any[]>([]);
  const [formModal, setFormModal] = useState(false);
  const [formChangeModal, setFormChangeModal] = useState(false);
  const [selectFields, setSelectFields] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [eventInfo, setEventInfo] = useState<any>({});
  const [editItem, setEditItem] = useState<SpendingEventsType>();
  const [filtersSpendings, setFiltersSpendings] = useState<
    QueryProps<SpendingEventsType>
  >({});
  const handleAdd = async (values: SpendingEventsType) => {
    // console.log(values)
    spendingsService.create(values);
    setFormModal(false);
  };
  const handleDelete = async (values: any) => {
    spendingsService.destroy(id);
    
    setFormChangeModal(false);
    setId("");
  };
  const handleEditForm = async (values: any) => {
    setId(values);
    console.log(id);
    spendingsService.findById(values).then((data) => setEventInfo(data));
    setFormChangeModal(true);
  };

  const handleUpdate = async (values: any) => {
    spendingsService.update(id, values);
    setFormChangeModal(false);
  };

  useEffect(() => {
    spendingsService
      .find({
        ...filtersSpendings,
      })
      .then((data) => setEvent(data));
  }, [formModal, formChangeModal,handleDelete]);

  useEffect(() => {
    const result: any = [];
    selectFieldService.find().then((data) =>
      data.map((values) => {
        if (values.type === "spending") {
          result.push(values);
          return setSelectFields(result);
        }
      })
    );
  }, []);

  const handleDateClick = (arg: any) => {
    handleEditForm(arg.event.id);
  };

  
 
  return (
    <>
      <Button
        onClick={() => setFormModal(true)}
        type="primary"
        icon={<PlusCircleOutlined />}
      >
        {t("Add Spending")}
      </Button>

      <ModalForm
        title={t("Add")}
        visible={formModal}
        onCancel={() => {
          setFormModal(false);
          setEditItem(undefined);
        }}
        onOk={handleAdd}
        initialValues={editItem}
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
            defaultValue="Select Fields"
            options={selectFields.map((value) => {
              return { value: value._id, label: value.name };
            })}
          ></Select>
        </Form.Item>
      </ModalForm>

      <ModalForm
        title={t("Info Update")}
        visible={formChangeModal}
        onOk={handleUpdate}
        onCancel={() => {
          setId("");
          setFormChangeModal(false);
          setEditItem(undefined);
        }}
        initialValues={editItem}
      >
        <Form.Item
          name={"amount"}
          rules={[{ required: false, message: t("Name is required!") }]}
        >
          <Input
            type="number"
            value={eventInfo.amount}
            placeholder={eventInfo.amount}
          />
        </Form.Item>
        <h4>Date: {eventInfo.date}</h4>
        <Form.Item
          name={"date"}
          rules={[{ required: false, message: t("Name is required!") }]}
        >
          <Input type="date" placeholder={eventInfo.date} />
        </Form.Item>
        <h4>
          Type:{" "}
          {selectFields.map((value) => {
            if (value._id === eventInfo.type) {
              return value.name;
            }
          })}
        </h4>
        <Form.Item name={"type"}>
          <Select
            defaultValue="Select Fields"
            options={selectFields.map((value) => {
              return { value: value._id, label: value.name };
            })}
          ></Select>
        </Form.Item>
        <Button onClick={handleDelete}>Delete</Button>
      </ModalForm>

      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={handleDateClick}
        events={event.map((event) => ({
          id: event._id,
          title: `${event.amount}${selectFields.map((value) => {
            if (value._id === event.type) { 
                return value.name
              }
            
          })}`,
          start: moment(event.date).toDate(),
          end: moment(event.date).toDate(),
        }))}
      />
    </>
  );
}

export default Calendar;
