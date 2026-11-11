import AddTutor from "@/components/addTutor/AddTutor";

export const metadata = {
  title: "Add Tutor | MediQueue",
  description: "MediQueue - Tutor Booking System app",
};

const AddTutorPage = () => {
  return (
    <>
      <div className="my-22">
        <h2 className="flex mx-auto max-w-5xl text-2xl font-bold mb-2">Add tutor page</h2>
        <AddTutor/>
      </div>
    </>
  );
};

export default AddTutorPage;
