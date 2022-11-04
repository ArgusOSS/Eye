import { baseDashboardLayout } from "../../src/components/dashboard/Base";
import { dashboardStatus } from "../../src/components/dashboard/Status";

const styles = {
  marginTop: 30,
  textAlign: "center",
};

export default function Login() {
  return (
    <baseDashboardLayout>
      <dashboardStatus />
    </baseDashboardLayout>
  );
}
