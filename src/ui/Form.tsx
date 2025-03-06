import React, { useState } from "react";
import { FormField } from "../types/FormFieldType";
import Input from "./Input";

type FormProps = {
  fields: FormField[];
  onSubmit: (values: { [key: string]: string }) => void;
  className?: string;
};

const Form = ({ fields, onSubmit, className }: FormProps) => {
  // Stato per gestire i valori dei campi
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  // Gestore dell'input, aggiorna il valore nel state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Gestore del submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues); // Invoca la funzione onSubmit passando i valori del form
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 flex flex-col gap-4`}>
        <div className={className}>
          {fields.map((field) => (
            <div
              key={field.name}
              className="flex flex-col gap-2">
              <label
                htmlFor={field.name}
                className="text-md text-white/80 font-semibold">
                {field.name}
              </label>
              <Input
                type={field.type}
                name={field.name}
                value={formValues[field.name] || field.defaultValue || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            </div>
          ))}{" "}
        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer text-white font-semibold px-4 py-2 bg-orange-400 hover:bg-orange-500 transition-all duration-200 rounded-md">
            Submit
          </button>
        </div>
      </form>{" "}
    </div>
  );
};

export default Form;
