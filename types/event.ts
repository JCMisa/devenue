// types/event.ts
export interface CreateEventInput {
  title: string;
  description: string;
  overview: string;
  venue: string;
  location: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[]; // array of agenda items
  organizer: string;
  tags: string[]; // array of tags
  image: File; // file upload
}
