import { BaseDashboardLayout } from "../../src/components/dashboard/Base";
import { ThankYou } from "../../src/components/dashboard/thankYou";


const styles = {
  marginTop: 30,
  textAlign: "center",
};

export default function Login() {
  return (
    <BaseDashboardLayout>
      <ThankYou />
    </BaseDashboardLayout>
  );
}
