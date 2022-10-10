import { BaseDashboardLayout } from "../../src/components/dashboard/Base";
import { DashboardShirt } from "../../src/components/dashboard/Shirt";

const styles = {
  marginTop: 30,
  textAlign: "center",
};

export default function Login() {
  return (
    <BaseDashboardLayout>
      <DashboardShirt />
    </BaseDashboardLayout>
  );
}
