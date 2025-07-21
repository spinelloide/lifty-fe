import axios from "axios";
import { environment } from "../environment/environment";
import { GenerateWorkoutFormData } from "../types/GenerateWorkoutFormData";

class AiServices {
  async generateWorkout(body: GenerateWorkoutFormData) {
    try {
      const response = await axios.post(
        `${environment.apiUrl}/ai/generate-workout`,
        body
      );
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero degli allenamenti:", error);
      throw error;
    }
  }
}

const aiServices = new AiServices();

export default aiServices;
