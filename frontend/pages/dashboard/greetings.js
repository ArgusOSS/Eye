import { BaseDashboardLayout } from "../../src/components/dashboard/Base";
import { Greetings } from "../../src/components/dashboard/Greetings";


const styles = {
  marginTop: 30,
  textAlign: "center",
};

export default function Login() {
  return (
    <BaseDashboardLayout>
      <Greetings />
    </BaseDashboardLayout>
  );
}
