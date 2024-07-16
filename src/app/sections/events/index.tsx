import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Calendar } from "antd";

import { ContentUI } from "#ui/content";
import { ModalUI } from "#ui/modal";

import { $eventsList } from "#stores/events";

import type { Moment } from 'moment';
import { RANGE_DATE_FORMAT } from "#constants/index";
import { useModalControl } from "#hooks/useModalControl";
import { AddEditEventModalPropTypes, AddEditEventModal } from "./addEditModal";
import "./styles.scss";
import { ButtonUI } from "#ui/button";
import { AddPlusSvgIcon } from "#src/assets/svg";



const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const currentDate = new Date();

export const Events = () => {

  const { data: eventsData, loading } = useStore($eventsList.store);

  const addEditEventModalControl = useModalControl<AddEditEventModalPropTypes>();

  const [params, setParams] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1
  });

  useEffect(() => {
    $eventsList.effect(params);
  }, [params]);


  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);

    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  const dateCellRender = (value: Moment) => {
    const date = value.format("YYYY-MM-DD");

    const listData = eventsData[date];

    return (
      <div className="calendar-day-item">
        <ButtonUI
          size="small"
          type="primary"
          onClick={() => {
            addEditEventModalControl.openModal({ date });
          }}
        >
          +
        </ButtonUI>
        {listData && (
          <ul className="events-list">
            {listData.sort((a, b) => {
              const timeA = new Date(`1970-01-01T${a.time}Z`);
              const timeB = new Date(`1970-01-01T${b.time}Z`);
              // @ts-ignore
              return timeA - timeB;
            }).map((item) => (
              <li key={item.id}>
                {item.name} - {item.time.substring(0, 5)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <ContentUI>
      <div className="main-content">
        <div className="folder-head content-block">
          <h1>Расписание</h1>
        </div>
        <div className="events-calendar-wrap content-block">
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </div>
      </div>

      <ModalUI
        open={addEditEventModalControl.modalProps.open}
        onCancel={addEditEventModalControl.closeModal}
      >
        <AddEditEventModal
          modalControl={addEditEventModalControl}
        />
      </ModalUI>
    </ContentUI>
  );
};