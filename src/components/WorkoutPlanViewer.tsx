import React from "react";
import { Exercise } from "../types/Exercise";

import { GeneratedWorkoutPlan } from "../types/GeneratedWorkoutPlan";
import workoutServices from "../services/WorkoutServices";
import authServices from "../services/AuthServices";
import exerciseServices from "../services/ExerciseServices";

const WorkoutPlanViewer: React.FC<GeneratedWorkoutPlan> = ({
  workout_plan,
  exercises,
}) => {
  const groupedByDay = exercises.reduce<Record<number, Exercise[]>>(
    (acc, ex) => {
      acc[ex.day] = acc[ex.day] || [];
      acc[ex.day].push(ex);
      return acc;
    },
    {}
  );

  const handleSubmitWorkoutPlan = async () => {
    // Logic to handle workout plan submission
    console.log("Workout plan submitted:", workout_plan);
    try {
      const response = await workoutServices.createWorkout({
        title: workout_plan.title,
        description: workout_plan.description,
        training_days: workout_plan.training_days,
        duration: workout_plan.duration,
        user_id: authServices.getLoginData()?.user.id ?? 0,
      });

   

      await Promise.all(
        exercises.map((exercise) =>
          exerciseServices.createExercise({
            ...exercise,
            workout_plan_id: response.id, // <-- usa l'id appena ottenuto
          })
        )
      );
    } catch (error) {
      console.error("Error submitting workout plan:", error);
      // Handle error appropriately, e.g., show a notification
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 text-white bg-gray-900 rounded-lg shadow ovefrflow-y-auto h-[75vh]">
        <div className="mb-6 border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold text-orange-400">
            {workout_plan.title}
          </h2>
          <p className="mt-2 text-gray-300">{workout_plan.description}</p>
          <div className="mt-4 text-sm text-gray-400 space-y-1 flex justify-between">
            <div>
              <div>
                Durata programma:{" "}
                <span className="text-orange-400">
                  {workout_plan.duration} settimane
                </span>
              </div>
              <div>
                Allenamenti a settimana:{" "}
                <span className="text-orange-400">
                  {workout_plan.training_days}
                </span>
              </div>
            </div>
            <div>
              <div>
                Esercizi totali previsti:{" "}
                <span className="text-orange-400">
                  {workout_plan.completed_count}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[50vh] overflow-y-auto custom-scrollbar px-4">
          {Object.entries(groupedByDay).map(([day, dayExercises]) => (
            <div key={day} className="mb-6">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">
                Giorno {day}
              </h3>
              <ul className="space-y-2">
                {dayExercises.map((ex, idx) => (
                  <li key={idx} className="bg-gray-800 p-3 rounded">
                    <div className="font-medium">{ex.name}</div>
                    <div className="text-sm text-gray-400">
                      Gruppo muscolare: {ex.muscle_group} | Serie: {ex.sets} |
                      Ripetizioni: {ex.reps} | Riposo: {ex.rest_time}s
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => {
            handleSubmitWorkoutPlan();
          }}
        >
          Salva Allenamento
        </button>
      </div>
    </>
  );
};

export default WorkoutPlanViewer;
