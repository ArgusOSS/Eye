import { Brand } from "./_brand";
import { User } from "./_user";
import { MainLinks } from "./_mainLinks";
import useMediaQuery from '@mui/material/useMediaQuery';
import { logoutUser } from "../../../../lib/auth";
import { Navbar, Title, ScrollArea, Header, AppShell } from '@mantine/core';


export function baseDashboardLayout(props) {
  const mobile = useMediaQuery('(max-width:500px)')
  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.status == "successful") {
        Router.push('/auth/login');
    }
  };

  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: '100%' }} px={20} position="apart">
            <Logo colorScheme={colorScheme} />
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
            </ActionIcon>
          </Group>
        </Header>
      }
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
  );
}
