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
