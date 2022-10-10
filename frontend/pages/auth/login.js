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

      <div style={styles} className="text-light">
        <a href="/auth/register">
          Haven't registered before?
        </a>
      </div>
    </BaseAuthLayout>
  );
}
