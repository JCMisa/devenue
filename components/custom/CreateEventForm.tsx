"use client";

import { useState } from "react";
import { CreateEventInput } from "@/types/event";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateEventForm = () => {
  const router = useRouter();

  const [form, setForm] = useState<Omit<CreateEventInput, "image">>({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "online",
    audience: "",
    agenda: [],
    organizer: "",
    tags: [],
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.warning("Image is required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      formData.append("image", image);

      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Event created successfully!");
        console.log("Created event:", data.event);

        router.push("/");
      } else {
        console.log(`Error: ${data.message}`);
        toast.error("Event failed to create");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="create-event" className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="glass card-shadow flex flex-col gap-6 rounded-[10px] border border-dark-200 px-6 py-8 w-full max-w-2xl mx-auto"
      >
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5 min-h-[100px]"
            required
          />
        </div>

        {/* Overview */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Overview</label>
          <textarea
            name="overview"
            value={form.overview}
            onChange={handleChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5 min-h-[80px]"
            required
          />
        </div>

        {/* Venue & Location */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Venue</label>
          <input
            type="text"
            name="venue"
            value={form.venue}
            onChange={handleChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>

        {/* Date & Time */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-light-100 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="bg-dark-200 rounded-[6px] px-5 py-2.5"
              required
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-light-100 font-semibold">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="bg-dark-200 rounded-[6px] px-5 py-2.5"
              required
            />
          </div>
        </div>

        {/* Mode */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Mode</label>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Audience */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Audience</label>
          <input
            type="text"
            name="audience"
            value={form.audience}
            onChange={handleChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>

        {/* Organizer */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Organizer</label>
          <input
            type="text"
            name="organizer"
            value={form.organizer}
            onChange={handleChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">
            Tags (comma separated)
          </label>
          <input
            type="text"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, tags: e.target.value.split(",") }))
            }
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>

        {/* Agenda */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">
            Agenda (comma separated)
          </label>
          <input
            type="text"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                agenda: e.target.value.split(","),
              }))
            }
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[6px] px-4 py-2.5 text-lg font-semibold text-black"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </section>
  );
};

export default CreateEventForm;
