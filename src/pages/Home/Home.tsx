import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workoutServices from "../../services/WorkoutServices";
import Grid from "../../ui/Grid";
import { Workout } from "../../types/Workout";
import Card from "../../ui/Card";

const Home = () => {
  const navigate = useNavigate();
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);

  const getWorkouts = async () => {
    try {
      const response = await workoutServices.getList();

      console.log("response", response);
      setWorkoutList(response);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Workouts</h1>
        <button
          onClick={() => navigate("/create-workout")}
          className="cursor-pointer text-white font-semibold px-4 py-2 bg-orange-400 hover:bg-orange-500 transition-all duration-200 rounded-md">
          Create Workout
        </button>
      </div>
      <Grid
        columns={4}
        gap={2}>
        {workoutList.map((el) => (
          <Card
            width="20"
            height="20"
            className="bg-white">
            {el.title}
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
