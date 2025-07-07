import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Grid from "../../ui/Grid";
import PrimaryButton from "../../ui/PrimaryButton";
import { Workout } from "../../types/Workout";
import WorkoutCard from "../../components/WorkoutCard";

import ConfirmDeleteWorkoutModal from "../../components/ConfirmDeleteWorkoutModal.tsx";

import workoutServices from "../../services/WorkoutServices";
import { routes } from "../../utils/routes";
import { sendToast } from "../../utils/toastUtils";
import authServices from "../../services/AuthServices";
import Page from "../../components/Page";

const Home = () => {
  const navigate = useNavigate();
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<number | null>(null);

  const user = authServices.getLoginData();

  const getWorkouts = async () => {
    try {
      if (user) {
        const response = await workoutServices.getList(user.user.id);
        setWorkoutList(response);
      }
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
          <span className="text-lg text-white w-full flex justify-center items-center h-40">
            Non ci sono allenamenti
          </span>
        )}
      </div>

      <ConfirmDeleteWorkoutModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setWorkoutToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </Page>
  );
};

export default Home;
