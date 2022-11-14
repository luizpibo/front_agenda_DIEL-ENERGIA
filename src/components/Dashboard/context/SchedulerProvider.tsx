import {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FullCalendar from "@fullcalendar/react";
import {
  schedulerService
} from "../../../services/schedulerService";

export interface IEvent {
  start: string;
  end: string;
  id?: string;
  title: string;
  description: string;
  duration: number;
  userUid?: string;
}

interface ISchedulerContext {
  calendarRef: MutableRefObject<FullCalendar>;
  events?: IEvent[];
  selectedEvent?: IEvent;
  handleAddEvent: (event: IEventDTO) => Promise<void>;
  handleUpdateEvent: (eventDTO: IEventDTO, selectedEvent: IEvent) => Promise<void>;
  selectEventById: (eventId: string) => boolean;
  handleDeleteEvent: (eventId: string) => void;
}

export interface IEventDTO {
  title: string;
  description: string;
  start: Date;
  duration: number;
}

interface IProvider {
  children: React.ReactNode;
}

export const SchedulerContext = createContext<ISchedulerContext>(
  {} as ISchedulerContext
);

const SchedulerProvider: React.FC<IProvider> = ({ children }) => {
  // const { currentUser } = useContext(AuthContext);
  const [selectedEvent, setSelectedEvent] = useState<IEvent>();
  const [events, setEvents] = useState<IEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null!);

  // useEffect(() => {
  //   const fetchData = async (userUid: string) =>
  //     await getAllUserEventsService(userUid);
  //   fetchData(currentUser.userUid).then((data) => {
  //     setEvents(data);
  //   });
  // }, []);

  const updateEventState = (newEvent: IEvent) => {
    const newEventsList = events.map((event) => {
      if (event.id == newEvent.id) {
        return newEvent;
      }
      return event;
    });
    setEvents(newEventsList);
  };

  const selectEventById = (id: string) => {
    const eventFiltering = events.filter((event) => event.id === id);
    if (eventFiltering.length > 0) {
      setSelectedEvent(eventFiltering[0]);
      return true;
    }
    return false;
  };

  const handleAddEvent = async (eventDTO: IEventDTO) => {
    try {
      const newEvent = await  schedulerService.addNewEvent(eventDTO);
      setEvents([...events, newEvent]);
    } catch(e){
      console.log("Erro ao adicionar tarefa")
    }
  };

  const handleUpdateEvent = async (eventDTO: IEventDTO, selectedEvent: IEvent) => {
    const updatedEvent = await schedulerService.updadeEvent(eventDTO, selectedEvent);
    updateEventState(updatedEvent);
  };

  const handleDeleteEvent = async (eventId: string) => {
    await schedulerService.deleteEvent(eventId);
    const newEventsList = events.filter((event)=>{
      if(event.id != eventId){
        return event
      }
    })
    setEvents(newEventsList);
  };

  return (
    <div className="relative">
      <SchedulerContext.Provider
        value={{
          calendarRef,
          events,
          selectedEvent,
          handleAddEvent,
          handleUpdateEvent,
          handleDeleteEvent,
          selectEventById,
        }}
      >
        {children}
      </SchedulerContext.Provider>
    </div>
  );
};

export default SchedulerProvider;
