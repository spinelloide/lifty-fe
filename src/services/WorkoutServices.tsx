import axios from "axios";
import { environment } from "../environment/environment";
import { Workout } from "../types/Workout";

class WorkoutServices {
  async getList(userId: number): Promise<Workout[]> {
    try {
      const response = await axios.get(
        `${environment.apiUrl}/workout/list/${userId}`
      );
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
    completed_count?: number;
  }): Promise<Workout> {
    try {
      const completed_count = workoutData.duration * workoutData.training_days;
      const response = await axios.post(
        `${environment.apiUrl}/workout/create`,
        { ...workoutData, completed_count }
      );

      // Array.from({ length: workoutData.training_days }).forEach(() => {
      //   workoutDayServices.addWorkoutDay({
      //     workout_plan_id: response.data.id,
      //     count: workoutData.duration,
      //   });
      // });
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

  async updateWorkoutStatus(workoutId: number, status: boolean) {
    try {
      const response = await axios.put(
        `${environment.apiUrl}/workout/status/${workoutId}`,
        { isActive: status }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Errore nell'aggiornamento dello stato dell'allenamento:",
        error
      );
      throw error;
    }
  }

  async decrementCompletedCount(workoutId: number) {
    try {
      const response = await axios.put(
        `${environment.apiUrl}/workout/${workoutId}/decrement-completed`
      );
      return response.data;
    } catch (error) {
      console.error("Errore nel decremento del completed_count:", error);
      throw error;
    }
  }
}

const workoutServices = new WorkoutServices();

export default workoutServices;
