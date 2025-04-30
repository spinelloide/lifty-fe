import axios from "axios";
import { environment } from "../environment/environment";

class WorkoutDayServices {
  async addWorkoutDay(workoutData: { workout_plan_id: number; count: number }) {
    try {
      const response = await axios.post(
        `${environment.apiUrl}/workout_day/create`,
        {
          workout_plan_id: workoutData.workout_plan_id,
          count: 8,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Errore nella creazione dei giorni dell'allenamento:",
        error
      );
      throw error;
    }
  }

  async listDaysByWorkoutPlanId(workoutPlanId: number) {
    // workout_day/list/20
    try {
      const response = await axios.get(
        `${environment.apiUrl}/workout_day/list/${workoutPlanId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Errore nella creazione dei giorni dell'allenamento:",
        error
      );
      throw error;
    }
  }
}

const workoutDayServices = new WorkoutDayServices();

export default workoutDayServices;
