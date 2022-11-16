/* eslint-disable react/jsx-props-no-multi-spaces */

// import useMediaQuery from '@mui/material/useMediaQuery';
import { Navbar, AppShell } from "@mantine/core";

// import Router from 'next/router';

import { User } from "./_user";

import { MainLinks } from "./_mainLinks";
// import { logoutUser } from '../../../../lib/auth';
import { BaseDashboardHeader } from "./_header";

export function BaseDashboardLayout(props) {
  // const mobile = useMediaQuery('(max-width:500px)');
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // const handleLogout = async () => {
  //   const response = await logoutUser();
  //   if (response.status == 'successful') {
  //     Router.push('/auth/login');
  //   }
  // };

  const DashboardHeader = BaseDashboardHeader();

  return (
    <div>
      {DashboardHeader}
      <AppShell
        padding="md"
        fixed
        navbar={
          <Navbar
            width={{
              // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
              sm: 200,

              // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
              lg: 300,

              // When other breakpoints do not match base width is used, defaults to 100%
              base: 100,
            }}
          >
            <Navbar.Section grow mt="xs">
              <MainLinks activeLink={props.activeLink} />
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        // header={DashboardHeader}
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <div className="row">
          <div className="col">{props.children}</div>
        </div>
      </AppShell>
    </div>
  );
}
