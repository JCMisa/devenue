"use client";

import { refreshEvents } from "@/lib/actions/event.actions";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

const RefreshBtn = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshEvents(); // triggers the server action that revalidates the tag of the caching of fetch events in the home page, so user manually get a fresh events data without waiting for an hour
    } catch (error) {
      console.log("Error refreshing events: ", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <button
      type="button"
      className="rounded-md flex items-center justify-center text-center border border-accent-foreground bg-transparent text-sm font-bold cursor-pointer p-2 w-32"
      onClick={handleRefresh}
      disabled={refreshing}
    >
      {refreshing ? (
        <LoaderCircleIcon className="size-4 animate-spin" />
      ) : (
        "Refresh"
      )}
    </button>
  );
};

export default RefreshBtn;
