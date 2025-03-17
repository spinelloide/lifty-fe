import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import Grid from "../../ui/Grid";
import Card from "../../ui/Card";
import PrimaryButton from "../../ui/PrimaryButton";
import { Workout } from "../../types/Workout";

import workoutServices from "../../services/WorkoutServices";
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
          {workoutList.map((el) => (
            <Card
              key={el.id}
              width="20"
              height="20"
              className="group cursor-pointer"
            >
              <div
                onClick={() => navigate(`/add-exercises/${el.id}`)}
                className="flex flex-col h-full"
              >
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-orange-400 transition-colors duration-200">
                  {el.title}
                </h3>
                <p className="text-gray-300 text-sm flex-grow group-hover:text-gray-200 transition-colors duration-200">
                  {el.description || "No description available"}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex flex-col gap-2">
                    <span className="text-orange-400 text-sm">
                      {el.training_days} days program
                    </span>
                    {/* {!el.is_ready && (
                      <button
                        onClick={() => navigate(`/add-exercises/${el.id}`)}
                        className="w-full text-white font-semibold px-4 py-2 bg-black/40 backdrop-blur-sm backdrop-filter hover:bg-black/50 transition-all duration-200 rounded-lg shadow-lg cursor-pointer border border-red-400/50 hover:border-red-400 relative z-10"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <BiErrorCircle className="text-red-500 text-xl" />
                          Add exercises to your workout
                        </span>
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
