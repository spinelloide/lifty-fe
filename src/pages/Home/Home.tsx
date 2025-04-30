import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Grid from "../../ui/Grid";
import PrimaryButton from "../../ui/PrimaryButton";
import { Workout } from "../../types/Workout";
import WorkoutCard from "../../components/WorkoutCard";
import Modal from "../../ui/Modal";

import workoutServices from "../../services/WorkoutServices";
import { routes } from "../../utils/routes";
import { sendToast } from "../../utils/toastUtils";
import Page from "../../components/Page";
const Home = () => {
  const navigate = useNavigate();
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<number | null>(null);

  const getWorkouts = async () => {
    try {
      const response = await workoutServices.getList();
      setWorkoutList(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteWorkout = async (workoutId: number) => {
    setWorkoutToDelete(workoutId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (workoutToDelete) {
      try {
        await workoutServices.deleteWorkout(workoutToDelete);
        await getWorkouts();
        sendToast("success", "Workout eliminato con successo!");
      } catch (error) {
        console.error("Errore durante l'eliminazione del workout:", error);
        sendToast("error", "Errore durante l'eliminazione del workout");
      } finally {
        setIsDeleteModalOpen(false);
        setWorkoutToDelete(null);
      }
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <>
      <Page>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Workouts
          </h1>
          <PrimaryButton
            text="Create workout"
            onClickHandler={() => navigate("/create-workout")}
            classNames="cursor-pointer text-white font-semibold px-6 py-3 bg-orange-500 hover:bg-orange-600 transition-all duration-200 rounded-xl shadow-lg hover:shadow-orange-500/20"
          />
        </div>
        <div className="space-y-8">
          <Grid columns={4} gap={4}>
            {workoutList.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col w-full hover:shadow-xl transition-all duration-300"
              >
                <WorkoutCard
                  workout={workout}
                  onDelete={handleDeleteWorkout}
                  onNavigate={(id) => navigate(`/add-exercises/${id}`)}
                />
                <div className="bg-orange-400 w-[18rem] relative z-9 pt-3 pb-2 px-2 flex justify-center rounded-b-xl ">
                  <div
                    className="text-white font-bold cursor-pointer hover:opacity-60 transition-all duration-300 duration-300"
                    onClick={() =>
                      navigate(`${routes.START_WORKOUT}/${workout.id}`)
                    }
                  >
                    Start workout
                  </div>
                </div>
              </div>
            ))}
          </Grid>
          {workoutList.length === 0 && (
            <span className="text-lg text-white w-full flex justify-center items-center h-40">Non ci sono allenamenti</span>
          )}
        </div>
      </Page>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setWorkoutToDelete(null);
        }}
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Conferma eliminazione
          </h3>
          <p className="text-gray-300 mb-6">
            Sei sicuro di voler eliminare questo workout?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setWorkoutToDelete(null);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Annulla
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Elimina
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
