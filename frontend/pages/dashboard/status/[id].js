import React from 'react';
import { BaseDashboardLayout } from '../../../src/components/dashboard/Base'
import { DashboardDetailedServerStatus } from '../../../src/components/dashboard/Status/detailed';
import { useRouter } from 'next/router';

export default function DetailedServerStatus() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <BaseDashboardLayout activeLink="Status">
          <DashboardDetailedServerStatus id={id}/>
        </BaseDashboardLayout>
      );
}