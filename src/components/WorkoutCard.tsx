import { FiTrash2, FiCalendar, FiClock } from "react-icons/fi";
import Card from "../ui/Card";
import { Workout } from "../types/Workout";
import Modal from "../ui/Modal";
import { useState } from "react";

interface WorkoutCardProps {
  workout: Workout;
  onDelete: (id: number) => void;
  onNavigate: (id: number) => void;
}

const WorkoutCard = ({ workout, onDelete, onNavigate }: WorkoutCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <Card
      key={workout.id}
      width="20"
      height="15"
      className="group cursor-pointer"
    >
      <div className="flex flex-col h-full relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteModalOpen(true);
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
        <div
          onClick={() => onNavigate(workout.id)}
          className="flex flex-col h-full"
        >
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-orange-400 transition-colors duration-200">
            {workout.title}
          </h3>
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
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-white">Conferma eliminazione</h3>
          <p className="text-gray-300 mb-6">Sei sicuro di voler eliminare questo workout?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Annulla
            </button>
            <button
              onClick={() => {
                onDelete(workout.id);
                setIsDeleteModalOpen(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Elimina
            </button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default WorkoutCard;
