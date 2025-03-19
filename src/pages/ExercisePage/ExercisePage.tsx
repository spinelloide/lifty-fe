import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Exercise } from "../../types/Exercise";

import Modal from "../../ui/Modal";
import AddExercise from "../../components/AddExercise/AddExercise";
import Loader from "../../components/Loading/Loader";
import exerciseServices from "../../services/ExerciseServices";
import workoutServices from "../../services/WorkoutServices";
import { Workout } from "../../types/Workout";

const ExercisePage = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workoutInfo, setWorkoutInfo] = useState<Workout | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchExercises = async () => {
    try {
      if (id) {
        const data = await exerciseServices.getExerciseList(parseInt(id));
        setExercises(data);
      }
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError("Failed to fetch exercises");
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkoutDetail = async () => {
    try {
      if (id) {
        const data = await workoutServices.getWorkoutById(parseInt(id));
        setWorkoutInfo(data);
      }
    } catch (err) {
      console.error("Error fetching exercises:", err);
      setError("Failed to fetch exercises");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
    fetchWorkoutDetail();
  }, [id]);

  if (loading) {
    return <Loader className="w-12" />;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  const filteredExercises = exercises.filter(
    (exercise) => exercise.day === selectedDay
  );
  const handleSubmitExercise = async (exercise: Exercise) => {
    console.log("exercise", exercise);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between w-full">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-8">
            {workoutInfo?.title}
          </h1>{" "}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 border-2 bg-transparent border-primary rounded-lg backdrop-blur-lg text-primary hover:bg-white/20 transition-all"
            >
              Add Exercise to day {selectedDay}
            </button>
          </div>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Array.from(
            { length: workoutInfo?.training_days ?? 0 },
            (_, i) => i + 1
          ).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`cursor-pointer px-6 py-2 rounded-lg backdrop-blur-lg transition-all ${
                selectedDay === day
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white"
            >
              <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
              <p className="text-gray-300 mb-4">{exercise.muscle_group}</p>
              <div className="flex justify-between text-sm">
                <span>{exercise.sets} sets</span>
                <span>{exercise.reps} reps</span>
                <span>{exercise.rest_time}s rest</span>
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddExercise
            onSubmit={(exercise) => handleSubmitExercise(exercise)}
            onClose={() => setIsModalOpen(false)}
            workoutPlanId={parseInt(id!)}
            selectedDay={selectedDay}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ExercisePage;
