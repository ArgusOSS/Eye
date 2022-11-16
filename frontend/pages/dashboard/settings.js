/* eslint-disable import/no-default-export */
import { BaseDashboardLayout } from "../../src/components/dashboard/Base";
import { DashboardSettings } from "../../src/components/dashboard/Settings";

// const styles = {
//   marginTop: 30,
//   textAlign: 'center',
// };

export default function Settings() {
  return (
    <BaseDashboardLayout activeLink="Settings">
      <DashboardSettings />
    </BaseDashboardLayout>
  );
}
