export type EventType = {
    eventName: string;
    clubName: string;
    date: string;
    start: string;
    end: string;
    location: {
      title: string;
      latitude: number;
      longitude: number;
    }
  };