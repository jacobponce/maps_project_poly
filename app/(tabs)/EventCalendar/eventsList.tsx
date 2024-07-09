import { useEffect, useState } from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { EventType } from './EventType';

const useEventsList = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(FIREBASE_DB, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => doc.data() as EventType);
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);
  console.log(events)

  return events;
};

export default useEventsList;