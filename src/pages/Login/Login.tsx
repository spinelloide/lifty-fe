import authServices from "../../services/AuthServices";
import { FormField } from "../../types/FormFieldType";
import { User } from "../../types/User";
import Form from "../../ui/Form";

const Login = () => {
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
    try {
      const response = await authServices.signUp(values);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Form
        className="grid grid-cols-2 gap-5"
        fields={fields}
        onSubmit={(values) => handleSignup(values)}
      />
    </div>
  );
};

export default Login;
