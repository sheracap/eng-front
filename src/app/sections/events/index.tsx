import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Calendar, Popconfirm, Popover } from "antd";
import moment from "moment";
import type { Moment } from "moment";

import { ContentUI } from "#ui/content";
import { ModalUI } from "#ui/modal";

import { $deleteEvent, $eventsList } from "#stores/events";


import { useModalControl } from "#hooks/useModalControl";
import { AddEditEventModalPropTypes, AddEditEventModal } from "./addEditModal";
import "./styles.scss";
import { ButtonUI } from "#ui/button";
import { DeleteIcon, EditSvgIcon } from "#src/assets/svg";
import { getDateDifference } from "#utils/index";
import { notificationWarning } from "#ui/notifications";



const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const currentDate = new Date();

export const Events = () => {

  const { data: eventsData, loading } = useStore($eventsList.store);
  const deleteEventState = useStore($deleteEvent.store);

  const addEditEventModalControl = useModalControl<AddEditEventModalPropTypes>();

  const [params, setParams] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1
  });

  useEffect(() => {
    $eventsList.effect(params);
  }, [params]);

  const onDelete = (id: number) => {
    $deleteEvent.effect(id);
  }

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
            const nowDate = moment().format("YYYY-MM-DD");
            const dateDifference = getDateDifference(currentDate, nowDate);

            if (dateDifference >= 0) {
              addEditEventModalControl.openModal({ date });
            } else {
              notificationWarning("Дата уже прошла", "");
            }
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
                <Popover
                  overlayClassName="custom-popover"
                  placement="left"
                  trigger="click"
                  content={(
                    <div>
                      <div className="custom__popover__item">
                        <ButtonUI
                          withIcon
                          onClick={() => {
                            const nowDate = moment().format("YYYY-MM-DD");
                            const dateDifference = getDateDifference(currentDate, nowDate);

                            if (dateDifference >= 0) {
                              addEditEventModalControl.openModal({ date, eventDetails: item });
                            } else {
                              notificationWarning("Дата уже прошла", "");
                            }
                          }}
                        >
                          <EditSvgIcon /> Редактировать
                        </ButtonUI>
                      </div>
                      <div className="custom__popover__item">
                        <Popconfirm
                          title="Вы уверены, что хотите удалить ?"
                          onConfirm={() => {
                            onDelete(item.id)
                          }}
                          okText="Да"
                          cancelText="Нет"
                        >
                          <ButtonUI
                            danger
                            withIcon
                          >
                            <DeleteIcon /> Удалить
                          </ButtonUI>
                        </Popconfirm>
                      </div>
                    </div>
                  )}
                >
                  <div>{item.name} - {item.time.substring(0, 5)}</div>
                </Popover>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <ContentUI loading={loading || deleteEventState.loading}>
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