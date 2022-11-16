/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unknown-property */
import useMediaQuery from "@mui/material/useMediaQuery";
import { Paper } from "@mantine/core";
import { BaseDashboardHeader } from "../../dashboard/Base/_header";

export function BaseAuthLayout(props) {
  const mobile = useMediaQuery("(max-width:500px)");

  return (
    // <Box sx={{ overflowY: {lg: 'hidden', md: 'hidden', sm:'scroll', xs: 'scroll'}}}>
    <div className="container" style={mobile ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
      <BaseDashboardHeader />

      <div className="row justify-content-center center-screen">
        <div styles={{ border: "1px solid white" }} className="col-md-6 col-sm-12">
          <Paper radius="md" p="xl" withBorder {...props}>
            {props.children}
          </Paper>
        </div>
      </div>
    </div>
    // </Box>
  );
}
