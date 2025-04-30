import { FiTrash2, FiCalendar, FiClock } from "react-icons/fi";
import Card from "../ui/Card";
import { Workout } from "../types/Workout";
import IconButton from "../ui/IconButton";

interface WorkoutCardProps {
  workout: Workout;
  onDelete: (id: number) => void;
  onNavigate: (id: number) => void;
}

const WorkoutCard = ({ workout, onDelete, onNavigate }: WorkoutCardProps) => {
  return (
    <Card
      key={workout.id}
      width="18"
      height="13"
      className="group cursor-pointer"
    >
      <div className="flex flex-col h-full relative">
        <div
          onClick={() => onNavigate(workout.id)}
          className="flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-200">
              {workout.title}
            </h3>
            <IconButton icon={FiTrash2} onClick={() => onDelete(workout.id)} />
          </div>
          <p className="text-gray-300 text-sm flex-grow group-hover:text-gray-200 transition-colors duration-200">
            {workout.description || "No description available"}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-orange-400 w-4 h-4" />
                <span className="text-gray-300 text-sm">
                  {workout.training_days} days
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-orange-400 w-4 h-4" />
                <span className="text-gray-300 text-sm">
                  {workout.duration} weeks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkoutCard;
