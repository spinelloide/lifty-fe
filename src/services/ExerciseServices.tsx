import { Exercise } from "../types/Exercise";
import { environment } from "../environment/environment";

export const getExerciseList = async (workoutPlanId: number): Promise<Exercise[]> => {
  try {
    const response = await fetch(`${environment.apiUrl}/user/exercises/${workoutPlanId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};