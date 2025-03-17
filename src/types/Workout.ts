export interface Workout {
  id: number;
  created_at: string;
  title: string;
  description: string;
  training_days: number;
  user_id: number;
  is_ready: boolean;
}
