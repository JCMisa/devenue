"use server";

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    return similarEvents;
  } catch {
    return [];
  }
};

export const refreshEvents = async () => {
  await fetch(`${BASE_URL}/api/events`);
  revalidateTag("all-events", ""); // this will invalidate the waiting hour from the cacheLife in the fetching of events in home page
};
