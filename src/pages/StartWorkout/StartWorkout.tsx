import { useParams } from "react-router-dom";
import workoutServices from "../../services/WorkoutServices";
import { useEffect, useState } from "react";
import { Workout } from "../../types/Workout";
import { sendToast } from "../../utils/toastUtils";
import exerciseServices from "../../services/ExerciseServices";

import PrimaryButton from "../../ui/PrimaryButton";

function StartWorkout() {
  const { id } = useParams();
  const [workoutInfo, setWorkoutInfo] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkoutDetail();
  }, [id]);

  const fetchWorkoutDetail = async () => {
    try {
      if (id) {
        const data = await workoutServices.getWorkoutById(parseInt(id));
        setWorkoutInfo(data);
      }
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError("Failed to fetch exercises");
      sendToast("error", error ?? "");
    } finally {
      setLoading(false);
    }
  };

  const fetchExercisesList = async () => {
    try {
      if (workoutInfo?.id) {
        const response =
          await exerciseServices.getExercisesListByWorkoutPlanAndDay(
            workoutInfo?.id,
            2
          );
        console.log("response", response);
      }
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError("Failed to fetch exercises");
      sendToast("error", error ?? "");
    }
  };
  return (
    <div className="p-8">
      {!loading && (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-8">
            Inizia l'allenamento
          </h1>
          <p className="text-gray-300">Workout ID: {workoutInfo?.title}</p>
          <PrimaryButton text="fetch" onClickHandler={fetchExercisesList} />
        </div>
      )}
    </div>
  );
}

export default StartWorkout;
