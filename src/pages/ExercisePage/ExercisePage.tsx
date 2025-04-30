import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Exercise } from "../../types/Exercise";
import { toast } from "react-toastify";

import Modal from "../../ui/Modal";
import Loader from "../../components/Loader";
import exerciseServices from "../../services/ExerciseServices";
import workoutServices from "../../services/WorkoutServices";
import { Workout } from "../../types/Workout";
import { getMuscleGroupTitle } from "../../utils/stringUtils";
import AddExercise from "../../components/AddExercise";

import { MdOutlineRepeat } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { IoIosFitness } from "react-icons/io";

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

  const groupedExercises = filteredExercises.reduce((groups, exercise) => {
    const group = exercise.muscle_group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(exercise);
    return groups;
  }, {} as Record<string, Exercise[]>);

  const handleSubmitExercise = async (exercise: Exercise) => {
    try {
      await exerciseServices.createExercise(exercise);
      setExercises((prevExercises) => [...prevExercises, exercise]);
      setIsModalOpen(false);
      toast.success("Exercise added successfully!");
    } catch (error) {
      console.error("Error creating exercise:", error);
      toast.error("Failed to add exercise. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {workoutInfo?.title}
            </h1>
            {/* <div className="flex flex-row-reverse items-center gap-2">
              <h4
                className={`text-lg ${
                  workoutStatus ? "text-green-300" : "text-red-400"
                }`}
              >
                {workoutStatus ? "Attivo" : "Non attivo"}
              </h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={workoutStatus}
                  onChange={(e) => {
                    handleUpdateWOrkoutStatus(e.target.checked);
                  }}
                />
                <div className="w-11 h-6 bg-gray-600  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>{" "}
            </div> */}
          </div>{" "}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer px-6 py-2 border-2 bg-transparent border-primary rounded-lg backdrop-blur-lg text-primary hover:bg-white/20 transition-all"
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

        {Object.entries(groupedExercises).map(([muscleGroup, exercises]) => (
          <div key={muscleGroup} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {getMuscleGroupTitle(muscleGroup)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {exercise.name}
                  </h3>
                  <div className="flex justify-between text-sm mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <IoIosFitness className="text-orange-400 w-4 h-4" />
                      <span>{exercise.sets} sets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdOutlineRepeat className="text-orange-400 w-4 h-4" />
                      <span>{exercise.reps} reps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoMdTime className="text-orange-400 w-4 h-4" />
                      <span>{exercise.rest_time}s rest</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

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
