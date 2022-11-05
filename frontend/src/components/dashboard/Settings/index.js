import { useState } from "react";
import styles from "../../../../styles/Home.module.css";
import { Text, Accordion, Grid, Group, ActionIcon, Flex, Container, Modal, TextInput, Button } from "@mantine/core";
import { IconPlus, IconDots } from '@tabler/icons';
import ServerSetting from "./_serverSetting";

export function DashboardSettings() {
    const [newServerModalOpened, setNewServerModalOpened] = useState(false);

    const addNewServer = (() => {
        setNewServerModalOpened(true);
    })

    return (
        <Container>
            <Modal
                opened={newServerModalOpened}
                onClose={() => setNewServerModalOpened(false)}
                title="Add Server"
                centered
            >
                <Grid>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Server Name"
                            variant="filled"
                            radius="md"
                            withAsterisk
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Provider"
                            variant="filled"
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col>
                        <TextInput
                            placeholder="Frontend URL"
                            variant="filled"
                            radius="md"
                            withAsterisk
                        />
                    </Grid.Col>

                    <Grid.Col>
                        <TextInput
                            placeholder="API URL"
                            variant="filled"
                            radius="md"
                            withAsterisk
                        />
                    </Grid.Col>

                    <Grid.Col>
                        <TextInput
                            placeholder="Webhook URL"
                            variant="filled"
                            radius="md"
                            withAsterisk
                        />
                    </Grid.Col>
                </Grid>

                <Button 
                variant="gradient" 
                gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} 
                sx={(theme) => ({
                    marginTop: theme.spacing.md,
                    float: 'right'
                })} >ADD</Button>
            </Modal>
            <Group position="apart">
                <Text size="36px" weight={900}>SERVERS</Text>
                <ActionIcon onClick={addNewServer}><IconPlus /></ActionIcon>
            </Group>

            <Accordion variant="separated" radius="lg" defaultValue="customization">
                <ServerSetting serverName={"AWS-Server-1 [ServerID:EUR1-1635-243]"} />
                <ServerSetting serverName={"AWS-Server-1 [ServerID:EUR1-1635-243]"} />
                <ServerSetting serverName={"AWS-Server-1 [ServerID:EUR1-1635-243]"} />
                <ServerSetting serverName={"AWS-Server-1 [ServerID:EUR1-1635-243]"} />
                <ServerSetting serverName={"AWS-Server-1 [ServerID:EUR1-1635-243]"} />
            </Accordion>
        </Container>
    )
}
