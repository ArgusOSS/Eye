import Container from "@mui/material/Container";
import useMediaQuery from '@mui/material/useMediaQuery'

export function BaseDashboardLayout(props) {
  const mobile = useMediaQuery('(max-width:500px)')
  return (
    <Container maxWidth="md" style={mobile? {overflowY: 'scroll'}: { overflowY: "hidden"}}>
        <div className="row center-screen">
          <div className="col-md-6">{props.children}</div>
      </div>
    </Container>
  );
}
