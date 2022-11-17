import { Container, Space } from "@mantine/core";
// ximport styles from '../../../../styles/Home.module.css';
// import { AtAGlance } from './_atAGlance';
import { Servers } from "./_servers";

export function DashboardStatus() {
  return (
    <Container>
      <Space h="xl" />
      <Servers />
    </Container>
  );
}
