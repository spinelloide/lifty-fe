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
    case "7":
      return "CORE";
    case "8":
      return "FULL BODY";
    case "9":
      return "CARDIO";
    default:
      return "";
  }
}
export function getIdFromMuscleGroup(muscleGroup: string): string {
  switch (muscleGroup) {
    case "CHEST":
      return "1";
    case "BACK":
      return "2";
    case "TRICEPS":
      return "3";
    case "LEGS":
      return "4";
    case "BICEPS":
      return "5";
    case "SHOULDERS":
      return "6";
    case "CORE":
      return "7";
    case "FULL BODY":
      return "8";
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