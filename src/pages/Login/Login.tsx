import authServices from "../../services/AuthServices";
import { FormField } from "../../types/FormFieldType";
import { LoginForm } from "../../types/LoginForm";
import Form from "../../ui/Form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes/routes";

const Login = () => {
  const navigate = useNavigate();
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
    try {
      const response = await authServices.login(values.email, values.password);
      console.log("login response", response);
      navigate(routes.HOME);
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <div>
      <Form
        className="grid grid-cols-2 gap-5"
        fields={fields}
        onSubmit={(values) => handleLogin(values)}
      />
    </div>
  );
};

export default Login;
