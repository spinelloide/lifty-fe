import Form from "../../ui/Form";
import { FormField } from "../../types/FormFieldType";
import authServices from "../../services/AuthServices";
import workoutServices from "../../services/WorkoutServices";
import { useState } from "react";

const CreateWorkout = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const fields: FormField[] = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter workout title",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter workout description",
    },
    {
      name: "days",
      label: "Days",
      type: "number",
      placeholder: "Enter number of days",
    },
  ];

  const handleSubmit = async (values: { [key: string]: string }) => {
    setLoadingSubmit(true);
    try {
      await workoutServices.createWorkout({
        title: values.title,
        description: values.description,
        training_days: Number(values.days),
        user_id: authServices.getLoginData()?.user.id ?? 0,
      });

      setLoadingSubmit(false);
    } catch (error) {
      console.error("Error creating workout:", error);
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center ">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-3 text-white">
          Create New Workout
        </h1>
        <Form
          className="flex flex-col gap-4"
          fields={fields}
          isLoading={loadingSubmit}
          onSubmit={(values) => handleSubmit(values)}
        />
      </div>
    </div>
  );
};

export default CreateWorkout;
