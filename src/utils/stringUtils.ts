export function getMuscleGroupTitle(muscleGroup: string): string {
  switch (muscleGroup) {
    case "1":
      return "CHEST";
    case "2":
      return "BACK";
    case "3":
      return "TRICEPS";
    case "4":
      return "LEGS";
    case "5":
      return "BICEPS";
    case "6":
      return "SHOULDERS";
    default:
      return "";
  }
}

export const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};