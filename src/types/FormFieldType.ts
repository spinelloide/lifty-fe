import { InputTypes } from "./InputTypes";

export type FormField = {
  name: string;
  label: string;

  type: InputTypes;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
};
