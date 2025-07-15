import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Exercise } from "../../types/Exercise";
import { toast } from "react-toastify";

import { FiTrash2 } from "react-icons/fi";

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
import workoutDayServices from "../../services/WorkoutDayServices";
import { WorkoutDay } from "../../types/WorkoutDay";
import { MdEdit } from "react-icons/md";
import { sendToast } from "../../utils/toastUtils";
import EditDayLabel from "../../components/EditDayLabel";
import IconButton from "../../ui/IconButton";
import ConfirmDeleteExerciseModal from "../../components/ConfirmDeleteExerciseModal";

const ExercisePage = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workoutInfo, setWorkoutInfo] = useState<Workout | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setEditLabel] = useState("");
  const [editDay, setEditDay] = useState<WorkoutDay | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<number | null>(null);

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
  const fetchDays = async () => {
    try {
      if (id) {
        const data = await workoutDayServices.listDaysByWorkoutPlanId(
          parseInt(id)
        );

        const sortedData = data.sort((a, b) => a.id - b.id);

        setSelectedDay(sortedData[0].id);
        setWorkoutDays(data);
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
    fetchDays();
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

  const handleEditDayLabelSubmit = async (newLabel: string) => {
    if (!editDay) return;
    setEditLoading(true);
    try {
      await workoutDayServices.updateDayLabel(editDay.id, newLabel);
      setWorkoutDays((prev) =>
        prev.map((day) =>
          day.id === editDay.id ? { ...day, label: newLabel } : day
        )
      );
      sendToast("success", "Label aggiornata!");
      setIsEditModalOpen(false);
    } catch {
      sendToast("error", "Errore nell'aggiornamento della label");
    } finally {
      setEditLoading(false);
    }
  };

  const onDeleteExercise = (exerciseId: number) => {
    setExerciseToDelete(exerciseId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (exerciseToDelete) {
      try {
        await exerciseServices.deleteExercise(exerciseToDelete);
        await fetchExercises();
        sendToast("success", "Esercizio eliminato con successo!");
      } catch (error) {
        console.error("Errore durante l'eliminazione del workout:", error);
        sendToast("error", "Errore durante l'eliminazione del workout");
      } finally {
        setIsDeleteModalOpen(false);
        setExerciseToDelete(null);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {workoutInfo?.title}
            </h1>
          </div>{" "}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer px-6 py-2 border-2 bg-transparent border-primary rounded-lg backdrop-blur-lg text-primary hover:bg-white/20 transition-all"
            >
              Add Exercise to day{" "}
              {workoutDays.findIndex((el) => el.id === selectedDay) + 1}
            </button>
          </div>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[...workoutDays].map((day, idx) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`cursor-pointer px-6 py-2 rounded-lg backdrop-blur-lg transition-all ${
                selectedDay === day.id
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                {day.label ? day.label : `Day ${idx + 1}`}
                {selectedDay === day.id && (
                  <MdEdit
                    className="ml-2 cursor-pointer hover:text-orange-400 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditDay(day);
                      setEditLabel(day.label || "");
                      setIsEditModalOpen(true);
                    }}
                  />
                )}
              </span>
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
                  <div className="flex items-center w-full justify-between">
                    <h3 className="text-xl font-semibold mb-2">
                      {exercise.name}
                    </h3>
                    <IconButton
                      icon={FiTrash2}
                      onClick={() => onDeleteExercise(exercise.id!)}
                    />
                  </div>
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

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          {editDay && (
            <EditDayLabel
              initialLabel={editDay.label || ""}
              loading={editLoading}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleEditDayLabelSubmit}
            />
          )}
        </Modal>
        <ConfirmDeleteExerciseModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setExerciseToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default ExercisePage;
