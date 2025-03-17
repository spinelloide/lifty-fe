import axios from "axios";
import { environment } from "../environment/environment";
import { User } from "../types/User";

import { LoginResponse } from "./responses/LoginResponse";

class AuthServices {
  private readonly AUTH_KEY = 'auth_data';

  saveLoginData(data: LoginResponse) {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(data));
  }

  clearLoginData() {
    localStorage.removeItem(this.AUTH_KEY);
  }

  getLoginData(): LoginResponse | null {
    const data = localStorage.getItem(this.AUTH_KEY);
    return data ? JSON.parse(data) : null;
  }

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

  async login(email: string, password: string) {
    try {
      const response = await axios.post<LoginResponse>(
        `${environment.apiUrl}/auth/login`,
        { email, password }
      );
      this.saveLoginData(response.data);
      return response.data;
    } catch (error) {
      console.error("Errore durante il login:", error);
      throw error;
    }
  }
}

const authServices = new AuthServices();

export default authServices;
