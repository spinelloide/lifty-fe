import { useEffect } from "react";
import workoutServices from "../../services/WorkoutServices";

const Home = () => {
  const getWorkouts = async () => {
    try {
      const response = await workoutServices.getList();
      const response2 = await workoutServices.getMuscleGroupsList();
      console.log("response", response);
      console.log("response2", response2);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getWorkouts();
  }, []);

  return <div>Home</div>;
};

export default Home;
