import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useMediaQuery from '@mui/material/useMediaQuery'

export function BaseAuthLayout(props) {
  const mobile = useMediaQuery('(max-width:500px)')
  return (
    <Box sx={{ overflowY: {lg: 'hidden', md: 'hidden', sm:'scroll', xs: 'scroll'}}}>
    <Container maxWidth="md" style={mobile? {overflowY: 'scroll'}: { overflowY: "hidden"}}>
      <div className="container">
        <div className="row justify-content-center center-screen">
          <div styles={{border : "1px solid white"}} className="col-md-6 col-sm-12">{props.children}</div>
        </div>
      </div>
    </Container>
    </Box>
  );
}
