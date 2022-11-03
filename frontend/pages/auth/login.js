import { BaseAuthLayout } from "../../src/components/Auth/Base";
import { LoginForm } from "../../src/components/Auth/Login";

const styles = {
  marginTop: 30,
  textAlign: "center",
};

export default function Login() {
  return (
    <BaseAuthLayout>
      <LoginForm />
    </BaseAuthLayout>
  );
}
