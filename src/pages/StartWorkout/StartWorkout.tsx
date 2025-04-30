import { useParams } from "react-router-dom";
import workoutServices from "../../services/WorkoutServices";
import { useEffect, useState } from "react";
import { Workout } from "../../types/Workout";
import { sendToast } from "../../utils/toastUtils";
import exerciseServices from "../../services/ExerciseServices";

import workoutDayServices from "../../services/WorkoutDayServices";
import { WorkoutDay } from "../../types/WorkoutDay";
import React from "react";
import Modal from "../../ui/Modal";
import WorkoutDaysList from "../../components/ChooseWorkoutDay";

function StartWorkout() {
  const { id } = useParams();
  const [workoutInfo, setWorkoutInfo] = useState<Workout | null>(null);
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [exercisesList, setExercisesList] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    fetchDays();
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

  const fetchDays = async () => {
    try {
      if (id) {
        const data = await workoutDayServices.listDaysByWorkoutPlanId(
          parseInt(id)
        );

        setWorkoutDays(data);
      }
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError("Failed to fetch exercises");
    } finally {
      setLoading(false);
    }
  };

  const handleChooseDay = async (dayId: number) => {
    try {
      if (workoutInfo?.id) {
        const response =
          await exerciseServices.getExercisesListByWorkoutPlanAndDay(
            workoutInfo?.id,
            dayId
          );
        console.log("response", response);
        setExercisesList(response);
      }
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError("Failed to fetch exercises");
      sendToast("error", error ?? "");
    }

    setIsModalOpen(false);
  };

  console.log("exercisesList", exercisesList);
  return (
    <React.Fragment>
      <div className="p-8">
        {!loading && (
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-8">
              {workoutInfo?.title} - Inizia l'allenamento
            </h1>
            {/* <PrimaryButton text="fetch" onClickHandler={fetchExercisesList} /> */}
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WorkoutDaysList
          workoutDays={workoutDays}
          handleChooseDay={handleChooseDay}
        />
      </Modal>
    </React.Fragment>
  );
}

export default StartWorkout;
