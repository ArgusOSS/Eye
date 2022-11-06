import React from 'react';
import { BaseDashboardLayout } from '../../../src/components/dashboard/Base'
import { DashboardDetailedServerStatus } from '../../../src/components/dashboard/Status/detailed';
import { useRouter } from 'next/router';

export default function DetailedServerStatus() {
    const router = useRouter();
    const { idx } = router.query;

    return (
        <BaseDashboardLayout activeLink="Status">
          <DashboardDetailedServerStatus idx={idx}/>
        </BaseDashboardLayout>
      );
}