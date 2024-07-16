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
    const listData = eventsData[value.format(RANGE_DATE_FORMAT)];

    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ContentUI>
      <div className="main-content">
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
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