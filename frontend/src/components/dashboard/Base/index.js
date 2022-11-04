import { Brand } from "./_brand";
import { User } from "./_user";
import { MainLinks } from "./_mainLinks";
import useMediaQuery from '@mui/material/useMediaQuery';
import { logoutUser } from "../../../../lib/auth";
import { Navbar, Title, ScrollArea, Header, AppShell } from '@mantine/core';
import { Paper } from '@mantine/core';

function MyNavbar(props) {
  return <Navbar {...props}>Your component</Navbar>
}

export function BaseDashboardLayout(props) {
  const mobile = useMediaQuery('(max-width:500px)')
  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.status == "successful") {
        Router.push('/auth/login');
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center center-screen">
      <div styles={{border : "1px solid white"}} className="col-md-6 col-sm-12">
        <Paper radius="md" p="xl" withBorder {...props}>
          {props.children}
        </Paper>
        </div>
      </div>
    </div>  
  );

}
