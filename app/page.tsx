import EventCard from "@/components/custom/EventCard";
import ExploreBtn from "@/components/custom/ExploreBtn";
import RefreshBtn from "@/components/custom/RefreshBtn";
import { IEvent } from "@/database";
import { cacheLife, cacheTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function Home() {
  "use cache";
  cacheLife("hours"); // automatically cache every hour
  cacheTag("all-events"); // assign a tag for this specific fetching so it can be updated manually through server actions like new event creation, refresh trigger, delete, update, etc.
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackaton, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <h3>Featured Events</h3>
          <RefreshBtn />
        </div>

        <ul className="events list-none">
          {events && events.length > 0 ? (
            events.map((event: IEvent) => (
              <li key={event.slug}>
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <div className="font-bold text-[14px] leading-[18px] text-center h-full self-center w-full flex items-center justify-center">
              No event found.
            </div>
          )}
        </ul>
      </div>
    </section>
  );
}
