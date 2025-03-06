import axios from "axios";
import { environment } from "../environment/environment";

class WorkoutServices {
  async getList() {
    try {
      const response = await axios.get(`${environment.apiUrl}/workout/list`);
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero degli allenamenti:", error);
      throw error;
    }
  }

  async getMuscleGroupsList() {
    try {
      const response = await axios.get(`${environment.apiUrl}/workout/muscle_groups/list`);
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero degli allenamenti:", error);
      throw error;
    }
  }
}

const workoutServices = new WorkoutServices();

export default workoutServices;
