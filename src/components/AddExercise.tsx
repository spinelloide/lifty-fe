import { useEffect, useState } from "react";
import { Exercise } from "../types/Exercise";
import workoutServices from "../services/WorkoutServices";
import exerciseServices from "../services/ExerciseServices";

interface AddExerciseProps {
  onSubmit: (exercise: Exercise) => void;
  onClose: () => void;
  workoutPlanId: number;
  selectedDay: number;
}

const AddExercise = ({
  onSubmit,
  workoutPlanId,
  selectedDay,
}: AddExerciseProps) => {
  const [exerciseOptions, setExerciseOptions] = useState<{
    [key: number]: Exercise[];
  }>({});
  const [muscleGroupList, setMuscleGroupList] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      name: "",
      muscle_group: "",
      sets: 1,
      reps: 1,
      rest_time: 30,
      day: selectedDay,
      weight: [],
    },
  ]);

  const fetchExercisesByMuscleGroup = async (
    muscleGroupId: number,
    exerciseIndex: number
  ) => {
    try {
      const exercises = await exerciseServices.getExercisesByMuscleGroupId(
        muscleGroupId
      );
      setExerciseOptions((prev) => ({
        ...prev,
        [exerciseIndex]: exercises,
      }));
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleExerciseChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedExercises = [...exercises];

    if (field === "muscle_group") {
      updatedExercises[index] = {
        ...updatedExercises[index],
        muscle_group: value as string,
        name: "",
        sets: 1,
        reps: 1,
        rest_time: 30,
      };
    } else {
      updatedExercises[index] = {
        ...updatedExercises[index],
        [field]: value,
      };
    }

    setExercises(updatedExercises);
  };

  const addMoreExercise = () => {
    setExercises([
      ...exercises,
      {
        name: "",
        muscle_group: "",
        sets: 1,
        reps: 1,
        rest_time: 30,
        day: selectedDay,
        weight: [],
      },
    ]);
  };

  const handleSubmit = () => {
    exercises.forEach((exercise) => {
      onSubmit({
        ...exercise,
        workout_plan_id: workoutPlanId,
        day: selectedDay,
      });
    });
    // onClose();
  };

  const fetchMuscleGroup = async () => {
    try {
      const response = await workoutServices.getMuscleGroupsList();

      setMuscleGroupList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMuscleGroup();
  }, []);

  return (
    <div className="space-y-6 ">
      <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-2 custom-scrollbar px-4">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="space-y-4 p-6 bg-white/5 rounded-lg shadow-md backdrop-blur-lg"
          >
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Muscle Group
              </label>
              <select
                value={exercise.muscle_group}
                onChange={(e) => {
                  handleExerciseChange(index, "muscle_group", e.target.value);
                  if (e.target.value) {
                    fetchExercisesByMuscleGroup(
                      parseInt(e.target.value),
                      index
                    );
                  } else {
                    setExerciseOptions((prev) => ({
                      ...prev,
                      [index]: [],
                    }));
                  }
                }}
                className="w-full bg-white/10 border-0 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary"
              >
                <option value="">Select muscle group</option>
                {muscleGroupList.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Exercise Name
              </label>
              <select
                value={exercise.name}
                disabled={!exerciseOptions[index]?.length}
                onChange={(e) =>
                  handleExerciseChange(index, "name", e.target.value)
                }
                className="disabled:opacity-30 w-full bg-white/10 border-0 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary"
              >
                <option value="">Select exercise</option>
                {exerciseOptions[index]?.map((exercise) => (
                  <option key={exercise.id} value={exercise.name}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Sets
                </label>
                <input
                  type="number"
                  min="1"
                  value={exercise.sets}
                  disabled={!exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(
                      index,
                      "sets",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full bg-white/10 border-0 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary disabled:opacity-30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Reps
                </label>
                <input
                  type="number"
                  min="1"
                  value={exercise.reps}
                  disabled={!exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(
                      index,
                      "reps",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full bg-white/10 border-0 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary disabled:opacity-30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Rest Time (s)
                </label>
                <select
                  value={exercise.rest_time}
                  disabled={!exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(
                      index,
                      "rest_time",
                      parseInt(e.target.value)
                    )
                  }
                  className="disabled:opacity-30 w-full bg-white/10 border-0 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary"
                >
                  <option value="30">30</option>
                  <option value="60">60</option>
                  <option value="90">90</option>
                  <option value="120">120</option>
                  <option value="150">150</option>
                </select>
              </div>
            </div>
          </div>
        ))}{" "}
      </div>

      <div className="flex justify-between">
        <button
          onClick={addMoreExercise}
          className="px-6 py-2 border-2 bg-transparent border-primary rounded-lg backdrop-blur-lg text-primary hover:bg-white/20 transition-all"
        >
          Add Another Exercise
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-primary border-2 border-primary rounded-lg text-white hover:bg-primary/80 transition-all"
        >
          Save Exercises
        </button>
      </div>
    </div>
  );
};

export default AddExercise;
