import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Exercise } from "../../types/Exercise";
import { getExerciseList } from "../../services/ExerciseServices";
import Modal from "../../ui/Modal";

const ExercisePage = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trainingDays, setTrainingDays] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (id) {
          const data = await getExerciseList(parseInt(id));
          setExercises(data);
          // Find the maximum day value to determine total training days
          const maxDay = Math.max(...data.map((exercise) => exercise.day));
          setTrainingDays(maxDay);
        }
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Failed to fetch exercises");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-white">Loading exercises...</p>
        </div>
      </div>
    );
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

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between w-full">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-8">
            Workout {id}
          </h1>{" "}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 border-2 bg-transparent border-primary rounded-lg backdrop-blur-lg text-primary hover:bg-white/20 transition-all"
            >
              Add Exercise
            </button>
          </div>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Array.from({ length: trainingDays }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-2 rounded-lg backdrop-blur-lg transition-all ${
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
          <div className="text-white text-xl">Modal</div>
        </Modal>
      </div>
    </div>
  );
};

export default ExercisePage;
