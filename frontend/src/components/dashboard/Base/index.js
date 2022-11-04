import { Brand } from "./_brand";
import { User } from "./_user";
import { Logo } from "./_logo";
import { MainLinks } from "./_mainLinks";
import useMediaQuery from '@mui/material/useMediaQuery';
import { logoutUser } from "../../../../lib/auth";
import { Navbar, Title, ScrollArea, Header, AppShell, Group, useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconMoon, IconMoonStars } from '@tabler/icons';
import { BaseDashboardHeader } from "./_header";


export function BaseDashboardLayout(props) {
  const mobile = useMediaQuery('(max-width:500px)')
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.status == "successful") {
        Router.push('/auth/login');
    }
  };

  const DashboardHeader = BaseDashboardHeader();

  

  return (
    <div>
    {DashboardHeader}
    <AppShell
      padding="md"
      fixed={false}
      navbar={
          <Navbar 
          width={{
            // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
            sm: 300,
    
            // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
            lg: 400,
    
            // When other breakpoints do not match base width is used, defaults to 100%
            base: 100,
          }}
        >
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      
      // header={DashboardHeader}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <div className="row">
        <div className="col-md-6">{props.children}</div>
      </div>
    </AppShell>
    </div>
  );
}
