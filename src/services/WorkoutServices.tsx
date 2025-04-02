import axios from "axios";
import { environment } from "../environment/environment";
import { Workout } from "../types/Workout";

class WorkoutServices {
  async getList(): Promise<Workout[]> {
    try {
      const response = await axios.get(`${environment.apiUrl}/workout/list`);
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero degli allenamenti:", error);
      throw error;
    }
  }
  async getWorkoutById(workoutId: number): Promise<Workout> {
    try {
      const response = await axios.get(
        `${environment.apiUrl}/workout/${workoutId}`
      );
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero degli allenamenti:", error);
      throw error;
    }
  }

  async getMuscleGroupsList() {
    try {
      const response = await axios.get(
        `${environment.apiUrl}/workout/muscle_groups/list`
      );
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero degli allenamenti:", error);
      throw error;
    }
  }

  async createWorkout(workoutData: {
    title: string;
    description: string;
    training_days: number;
    duration: number;
    user_id: number;
  }) {
    try {
      const response = await axios.post(
        `${environment.apiUrl}/workout/create`,
        workoutData
      );
      return response.data;
    } catch (error) {
      console.error("Errore nella creazione dell'allenamento:", error);
      throw error;
    }
  }

  async deleteWorkout(workoutId: number) {
    try {
      const response = await axios.delete(
        `${environment.apiUrl}/workout/delete/${workoutId}`
      );
      return response.data;
    } catch (error) {
      console.error("Errore nella cancellazione dell'allenamento:", error);
      throw error;
    }
  }
}

const workoutServices = new WorkoutServices();

export default workoutServices;
