import { useEffect, useState } from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { EventType } from './EventType';

const useEventsList = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [reload, setReload] = useState(false);

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
  }, [reload]);
  console.log(events)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Reloading events...')
      setReload(prev => !prev); // Toggle the state to trigger re-fetching
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return events;
};

export default useEventsList;