import { environment } from "../environment/environment";
import { Exercise } from "../types/Exercise";
import axios from "axios";
class ExerciseServices {
  getExerciseList = async (workoutPlanId: number): Promise<Exercise[]> => {
    try {
      const response = await axios.get(
        `${environment.apiUrl}/user/exercises/${workoutPlanId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error;
    }
  };

  getExercisesByMuscleGroupId = async (
    muscleGroupId: number
  ): Promise<Exercise[]> => {
    try {
      const response = await axios.get(
        `${environment.apiUrl}/exercise/muscle-group/${muscleGroupId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error;
    }
  };

  createExercise = async (exercise: Exercise): Promise<Exercise> => {
    try {
      const response = await axios.post(
        `${environment.apiUrl}/exercise`,
        exercise
      );
      return response.data;
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }
  };
}
const exerciseServices = new ExerciseServices();

export default exerciseServices;
