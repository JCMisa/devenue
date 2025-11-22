import CreateEventForm from "@/components/custom/CreateEventForm";

const CreateEventPage = () => {
  return (
    <main className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <h1>Create a New Event</h1>
        <p className="text-light-100 text-lg max-sm:text-sm text-center">
          Fill out the form below to add your event to the hub.
        </p>
      </div>

      <CreateEventForm />
    </main>
  );
};

export default CreateEventPage;
