import React from 'react';
import { WorkoutDay } from '../types/WorkoutDay';
import { MdEdit } from 'react-icons/md';

interface WorkoutDaySelectorProps {
  workoutDays: WorkoutDay[];
  selectedDay: number;
  onSelectDay: (dayId: number) => void;
  onEditDay: (day: WorkoutDay) => void;
  isMobile: boolean;
  onClose?: () => void;
}

const WorkoutDaySelector: React.FC<WorkoutDaySelectorProps> = ({
  workoutDays,
  selectedDay,
  onSelectDay,
  onEditDay,
  isMobile,
  onClose
}) => {
  const handleDayClick = (dayId: number) => {
    onSelectDay(dayId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-3">
        {workoutDays.map((day, idx) => (
          <div
            key={day.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedDay === day.id
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleDayClick(day.id)}
                className="flex-1 text-left"
              >
                <h3 className="text-lg font-semibold text-white">
                  {day.label ? day.label : `Day ${idx + 1}`}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedDay === day.id ? 'Selected' : 'Tap to select'}
                </p>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditDay(day);
                }}
                className="ml-4 p-2 text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <MdEdit className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop version - horizontal scroll
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {workoutDays.map((day, idx) => (
        <button
          key={day.id}
          onClick={() => onSelectDay(day.id)}
          className={`cursor-pointer w-auto px-6 py-2 rounded-lg backdrop-blur-lg transition-all ${
            selectedDay === day.id
              ? "bg-white/20 text-white"
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            {day.label ? day.label : `Day ${idx + 1}`}
            {selectedDay === day.id && (
              <MdEdit
                className="ml-2 cursor-pointer hover:text-orange-400 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditDay(day);
                }}
              />
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export default WorkoutDaySelector;
