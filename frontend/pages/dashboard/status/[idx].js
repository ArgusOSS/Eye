/* eslint-disable import/no-default-export */
import React from "react";
import { useRouter } from "next/router";
import { BaseDashboardLayout } from "../../../src/components/dashboard/Base";
import { DashboardDetailedServerStatus } from "../../../src/components/dashboard/Status/detailed";

export default function DetailedServerStatus() {
  const router = useRouter();
  const { idx } = router.query;

  return (
    <BaseDashboardLayout activeLink="Status">
      <DashboardDetailedServerStatus idx={idx} />
    </BaseDashboardLayout>
  );
}
