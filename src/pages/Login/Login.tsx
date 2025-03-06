import { FormField } from "../../types/FormFieldType";
import Form from "../../ui/Form";

const Login = () => {
  const fields: FormField[] = [
    { name: "Email", type: "email", placeholder: "Enter your email" },
    { name: "Password", type: "password", placeholder: "Enter your password" },
  ];
  return (
    <div>
      <Form
        className="grid grid-cols-2 gap-5"
        fields={fields}
        onSubmit={(values) => console.log("submit", values)}
      />
    </div>
  );
};

export default Login;
