import { InputTypes } from "./InputTypes";

export type FormField = {
  name: string;
  type: InputTypes;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
};
