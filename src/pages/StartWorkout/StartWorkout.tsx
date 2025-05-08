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
import { formatTime } from "../../utils/stringUtils";
import PrimaryButton from "../../ui/PrimaryButton";
import PlainButton from "../../ui/PlainButton";

function StartWorkout() {
  const { id } = useParams();
  const [workoutInfo, setWorkoutInfo] = useState<Workout | null>(null);
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [exercisesList, setExercisesList] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [weights, setWeights] = useState<{ [key: number]: string }>({});
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const handleWeightChange = (exerciseId: number, value: string) => {
    setWeights((prev) => ({
      ...prev,
      [exerciseId]: value,
    }));
  };

  const handleExerciseComplete = (exerciseId: number) => {
    setCompletedExercises((prev) => {
      if (prev.includes(exerciseId)) {
        return prev.filter((id) => id !== exerciseId);
      }
      return [...prev, exerciseId];
    });
  };

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

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <React.Fragment>
      <div className="absolute top-5 w-full flex justify-center left-0">
        <PrimaryButton
          classNames="text-white w-60"
          text="Completa Workout"
          onClickHandler={() => setIsModalOpen(true)}
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center gap-10 justify-center">
        <div className="text-3xl font-mono text-white">{formatTime(time)}</div>
        <PlainButton
          onClickHandler={toggleTimer}
          text={isRunning ? "Stop" : "Play"}
          classNames={`px-6 py-2 rounded-full font-semibold ${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white transition-colors`}
        />
      </div>

      <div className="p-8">
        {!loading && (
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-8">
              {workoutInfo?.title} - Inizia l'allenamento
            </h1>
            <div className="space-y-4">
              {exercisesList.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex gap-2 items-center justify-between bg-gray-800 border border-gray-600 p-4 rounded-lg shadow-lg"
                >
                  <div className="text-white">•</div>
                  <div className="flex-1 grid grid-cols-6 gap-4 items-center text-white">
                    <div className="font-medium">{exercise.name}</div>
                    <div>{exercise.sets} serie</div>
                    <div>{exercise.reps} reps</div>
                    <div>{exercise.rest_time}s rest</div>
                    <div>
                      <input
                        type="text"
                        value={weights[exercise.id] || exercise.weight || ""}
                        onChange={(e) =>
                          handleWeightChange(exercise.id, e.target.value)
                        }
                        placeholder="Peso (kg)"
                        className="bg-gray-700 text-white px-3 py-1 rounded w-24"
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => handleExerciseComplete(exercise.id)}
                        className={`w-6 h-6 rounded-full border-2 ${
                          completedExercises.includes(exercise.id)
                            ? "bg-orange-500 border-orange-500"
                            : "border-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
