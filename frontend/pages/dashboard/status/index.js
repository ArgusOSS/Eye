/* eslint-disable import/no-default-export */
import { BaseDashboardLayout } from "../../../src/components/dashboard/Base";
import { DashboardStatus } from "../../../src/components/dashboard/Status";

// const styles = {
//   marginTop: 30,
//   textAlign: 'center',
// };

export default function Status() {
  return (
    <BaseDashboardLayout activeLink="Status">
      <DashboardStatus />
    </BaseDashboardLayout>
  );
}
