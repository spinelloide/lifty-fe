import axios from "axios";
import { environment } from "../environment/environment";
import { User } from "../types/User";

class AuthServices {
  async signUp(body: User) {
    try {
      const response = await axios.post(
        `${environment.apiUrl}/auth/signup`,
        body
      );
      return response.data;
    } catch (error) {
      console.error("Errore nel recupero degli allenamenti:", error);
      throw error;
    }
  }
}

const authServices = new AuthServices();

export default authServices;
