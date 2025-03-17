import { useNavigate } from "react-router-dom";
import Form from "../../ui/Form";
import { FormField } from "../../types/FormFieldType";
import workoutServices from "../../services/WorkoutServices";

const CreateWorkout = () => {
  const navigate = useNavigate();

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Create New Workout</h1>
      <Form
        fields={fields}
        onSubmit={() => console.log("ciao")}
        className="max-w-md"
      />
    </div>
  );
};

export default CreateWorkout;
