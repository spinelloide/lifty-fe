import { WorkoutDay } from "../types/WorkoutDay";
import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  workoutDays: WorkoutDay[];
  handleChooseDay: (dayId: number) => void;
};

function WorkoutDaysList({ workoutDays, handleChooseDay }: Props) {
  return (
    <>
      <h3 className="text-2xl font-bold text-white tracking-tight mb-8 text-center">
        Scegli quale giorno allenare
      </h3>
      <div className="min-w-md flex flex-col gap-2">
        {workoutDays
          .sort((a, b) => a.id - b.id)
          .map((day, idx) => (
            <div key={day.id} onClick={() => handleChooseDay(day.id)}>
              <PrimaryButton
                classNames="w-full flex flex-col items-center py-3"
                text={
                  <span>
                    <span className="block">
                      {day.label ? day.label : `Day ${idx + 1}`}
                    </span>
                    <span className="text-xs text-orange-100 font-semibold mt-1">
                      {day.count} allenamenti rimanenti
                    </span>
                  </span>
                }
              />
            </div>
          ))}{" "}
      </div>
    </>
  );
}

export default WorkoutDaysList;
