import { BaseAuthLayout } from "../../src/components/Auth/Base";
import { RegisterForm } from "../../src/components/Auth/Register";
import Link from "next/link";

const styles = {
  marginTop: 30,
  textAlign: "center",
};

export default function Register() {
  return (
    <BaseAuthLayout>
      <RegisterForm />

      <div style={styles} className="text-light">
        <Link href="/auth/login">
          Registered Before?
        </Link>
      </div>
    </BaseAuthLayout>
  );
}
