import authServices from "../../services/AuthServices";
import { FormField } from "../../types/FormFieldType";
import { User } from "../../types/User";
import Form from "../../ui/Form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const fields: FormField[] = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Surname",
      name: "surname",
      type: "text",
      placeholder: "Enter your surname",
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Enter your username",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const handleSignup = async (values: User) => {
    setIsLoading(true);
    try {
      await authServices.signUp(values);
      toast.success("Registrazione completata con successo!");
      navigate(routes.LOGIN);
    } catch (error) {
      toast.error("Errore durante la registrazione. Riprova.");
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-opacity-95 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
        <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-tight">
          Registrati
        </h1>
        <Form
          className="space-y-6"
          fields={fields}
          onSubmit={(values) => handleSignup(values)}
          isLoading={isLoading}
          submitText="Crea Account"
        />
      </div>
    </div>
  );
};

export default Signup;
