import styles from "../../../../styles/Home.module.css";
import { Text, Accordion, Grid, Group, ActionIcon, Flex, Container } from "@mantine/core";
import { IconPlus } from '@tabler/icons';

export function DashboardSettings() {
    return (
        <Container>
            <Group position="apart">
                <Text size="36px" weight={900}>SERVERS</Text>
                <ActionIcon><IconPlus /></ActionIcon>
            </Group>

            <Accordion variant="separated" radius="lg" defaultValue="customization">
                <Accordion.Item value="customization">
                    <Accordion.Control>Customization</Accordion.Control>
                    <Accordion.Panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="flexibility">
                    <Accordion.Control>Flexibility</Accordion.Control>
                    <Accordion.Panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="focus-ring">
                    <Accordion.Control>No annoying focus ring</Accordion.Control>
                    <Accordion.Panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}
