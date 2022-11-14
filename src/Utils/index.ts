import { IEvent } from "../components/Dashboard/context/SchedulerProvider";

export const updateLocalStorage = (paramsEvents: IEvent[]) => {
  localStorage.removeItem("events");
  localStorage.setItem("events", JSON.stringify(paramsEvents));
};

export const getEventsOnLocal = () => {
  const stringEvents = localStorage.getItem("events");
  if (stringEvents) {
    return JSON.parse(stringEvents);
  }
  return null;
};
