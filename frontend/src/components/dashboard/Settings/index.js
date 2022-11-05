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
                    <Accordion.Control>AWS-Server-1 [ServerID:EUR1-1635-243]</Accordion.Control>
                    <Accordion.Panel>Server Status: ACTIVE</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="flexibility">
                    <Accordion.Control>AWS-Server-2 [ServerID:ASIA1-1634-553]</Accordion.Control>
                    <Accordion.Panel>Server Status: ACTIVE</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="focus-ring">
                    <Accordion.Control>AZURE-Server-1 [ServerID:343/EUR243/221]</Accordion.Control>
                    <Accordion.Panel>Server Status: ACTIVE</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}
