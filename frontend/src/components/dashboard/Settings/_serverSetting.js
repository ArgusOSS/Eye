import { Accordion, Grid, TextInput, Switch, Box } from "@mantine/core";

export default function ServerSetting({ serverName }) {
    const EditAccordionControl = ((props) => {
        return (
            <Box sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing.md,
                alignSelf: 'center'
            })}>
                <Switch color="orange" />

                <Accordion.Control {...props} />
            </Box>
        );
    });

    return (
        <Accordion.Item value="customization">
                    <EditAccordionControl>{serverName}</EditAccordionControl>
                    <Accordion.Panel>
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
                    </Accordion.Panel>
                </Accordion.Item>
    );
}