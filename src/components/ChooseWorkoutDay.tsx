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
        {workoutDays.map((day, idx) => (
          <div key={day.id} onClick={() => handleChooseDay(day.id)}>
            <PrimaryButton
              text={day.label ? day.label : `Day ${idx + 1}`}
              classNames="w-full"
            />
          </div>
        ))}{" "}
      </div>
    </>
  );
}

export default WorkoutDaysList;
