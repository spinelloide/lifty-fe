export interface Workout {
  id: number;
  created_at: string;
  title: string;
  description: string;
  training_days: number;
  duration: number;
  user_id: number;
  is_ready: boolean;
  is_active: boolean;
  completed_count?: number;
}
