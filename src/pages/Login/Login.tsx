import authServices from "../../services/AuthServices";
import { FormField } from "../../types/FormFieldType";
import { LoginForm } from "../../types/LoginForm";
import Form from "../../ui/Form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const fields: FormField[] = [
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

  const handleLogin = async (values: LoginForm) => {
    setIsLoading(true);
    try {
      await authServices.login(values.email, values.password);
      toast.success("Login effettuato con successo!");
      navigate(routes.HOME);
    } catch (error) {
      toast.error("Errore durante il login. Riprova.");
      console.error("login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      {/* Left side - Login form */}
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <div className="mb-12 space-y-4">
            <h1 className="text-3xl lg:text-5xl text-center font-bold text-white tracking-tight">
              Welcome to Lifty
            </h1>
            <p className="text-gray-400 text-center text-md lg:text-xl leading-relaxed">
              Your personal workout companion. Transform your fitness journey
              with customized workout plans and expert guidance.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-2xl p-4 lg:p-8 transform transition-all duration-300 hover:scale-[1.02]">
            <Form
              className="space-y-6"
              fields={fields}
              onSubmit={(values) => handleLogin(values)}
              isLoading={isLoading}
              submitText="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
