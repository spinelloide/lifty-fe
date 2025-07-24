import Form from "../../ui/Form";
import { FormField } from "../../types/FormFieldType";
import authServices from "../../services/AuthServices";
import workoutServices from "../../services/WorkoutServices";
import { useState } from "react";

import { toast } from "react-toastify";
import { routes } from "../../utils/routes";
import { navigateAfterSubmit } from "../../utils/funcUtils";
import { sendToast } from "../../utils/toastUtils";
import Page from "../../components/Page";

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
      label: "Note",
      type: "text",
      placeholder: "Enter workout description",
    },
    {
      name: "days",
      label: "Trainings per week",
      type: "number",
      placeholder: "Enter number of days",
    },
    {
      name: "duration",
      label: "Duration (weeks)",
      type: "number",
      placeholder: "How long does your workout last?",
    },
  ];

  const handleSubmit = async (values: { [key: string]: string }) => {
    setLoadingSubmit(true);
    try {
      await workoutServices.createWorkout({
        title: values.title,
        description: values.description,
        training_days: Number(values.days),
        duration: Number(values.duration),

        user_id: authServices.getLoginData()?.user.id ?? 0,
      });

      setLoadingSubmit(false);
      sendToast("success", "Workout creato con successo");

      navigateAfterSubmit(routes.HOME);
    } catch (error) {
      console.error("Error creating workout:", error);
      toast.error("Errore durante la creazione del workout");
      setLoadingSubmit(false);
    }
  };

  return (
    <Page>
      <div className="p-8 flex flex-col items-center h-full justify-center">
        <div className="max-w-md w-full bg-gray-800/50 p-6 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Create New Workout
          </h1>
          <Form
            className="flex flex-col gap-6"
            fields={fields}
            isLoading={loadingSubmit}
            onSubmit={(values) => handleSubmit(values)}
          />
          {loadingSubmit && (
            <div className="mt-4 text-center text-orange-400">
              Creating your workout...
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default CreateWorkout;
