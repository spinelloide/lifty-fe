import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Grid from "../../ui/Grid";
import PrimaryButton from "../../ui/PrimaryButton";
import { Workout } from "../../types/Workout";
import WorkoutCard from "../../components/WorkoutCard";

import workoutServices from "../../services/WorkoutServices";
const Home = () => {
  const navigate = useNavigate();
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);

  const getWorkouts = async () => {
    try {
      const response = await workoutServices.getList();
      setWorkoutList(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteWorkout = async (workoutId: number) => {
    try {
      await workoutServices.deleteWorkout(workoutId);
      await getWorkouts(); // Aggiorna la lista dopo l'eliminazione
      toast.success("Workout eliminato con successo!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Errore durante l'eliminazione del workout:", error);
      toast.error("Errore durante l'eliminazione del workout");
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  console.log("workoutList", workoutList);
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
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
        <Grid columns={4} gap={4}>
          {workoutList.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onDelete={handleDeleteWorkout}
              onNavigate={(id) => navigate(`/add-exercises/${id}`)}
            />
          ))}
        </Grid>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
