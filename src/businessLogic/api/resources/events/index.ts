import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";

export const getEventsList: HandlerType<any, Array<any>> = ({ year, month }) => {
  return httpGet({ url: `/api/cabinet/events/month/${year}/${month}` });
};

export const addEvent: HandlerType<any, any> = (data) => {
  return httpPost({ url: "/api/cabinet/events", data });
};

export const deleteEvent: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/cabinet/events/${id}` });
};

export const updateEvent: HandlerType<any, any> = ({ id, data }) => {
  return httpPut({ url: `/api/cabinet/events/${id}`, data });
};
