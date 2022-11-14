import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  deleteDoc,
} from "@firebase/firestore";
import { fireStoreApp } from "../API/firebaseApp";
import {
  IEvent,
  IEventDTO,
} from "../components/Dashboard/context/SchedulerProvider";
import moment from "moment";

interface FormatedEventDTO {
  description: string;
  duration: number;
  end: string;
  start: string;
  title: string;
}

class SchedulerService {
  dbInstance;
  constructor() {
    this.dbInstance = collection(fireStoreApp, "task");
  }
  // Buscando pelo banco de dados
  // const docRef = doc(fireStoreApp, "task", id);
  // const docData = await getDoc(docRef);

  private formatEventDTO(eventDTO: IEventDTO): FormatedEventDTO {
    return {
      description: eventDTO.description,
      duration: eventDTO.duration,
      end: moment(eventDTO.start)
        .add(eventDTO.duration, "minutes")
        .toISOString(),
      start: moment(eventDTO.start).toDate().toISOString(),
      title: eventDTO.title,
    };
  }

  public async getAllUserEvents(userUid: string): Promise<IEvent[]> {
    const q = query(this.dbInstance, where("userUid", "==", userUid));
    const eventsList = await getDocs(q).then((data) => {
      return data.docs.map((task) => {
        return { ...task.data() };
      });
    });
    return eventsList as IEvent[];
  }

  public async addNewEvent(eventDTO: IEventDTO): Promise<IEvent> {
    const formatedEvent = this.formatEventDTO(eventDTO);
    return await addDoc(this.dbInstance, formatedEvent).then((data) => {
      return {
        ...formatedEvent,
        id: data.id,
      };
    });
  }

  public async updadeEvent(
    eventDTO: IEventDTO,
    selectedEvent: IEvent
  ): Promise<IEvent> {
    const formatedEvent = {
      ...selectedEvent,
      ...this.formatEventDTO(eventDTO),
    } as IEvent;
    const refDoc = doc(this.dbInstance, selectedEvent.id);
    await setDoc(refDoc, formatedEvent);
    return formatedEvent;
  }

  public async deleteEvent(eventId: string) {
    try {
      const refDoc = doc(this.dbInstance, eventId);
      const returnEvent = await deleteDoc(refDoc);
    } catch (e) {
      console.log("Error", e);
    }
  }
}

export const schedulerService = new SchedulerService();
