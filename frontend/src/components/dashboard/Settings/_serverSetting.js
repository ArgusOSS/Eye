/* eslint-disable import/no-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from "react";
import { Accordion, Grid, TextInput, Switch, Box } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";
// import { useRouter } from 'next/router';

export default function ServerSetting({ server }) {
  const [active, setActive] = useState(server.active);

  function EditAccordionControl(props) {
    return (
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          padding: theme.spacing.md,
          alignSelf: "center",
        })}
      >
        <Switch
          checked={active}
          onChange={(event) => setActive(event.currentTarget.checked)}
          color="teal"
          size="md"
          thumbIcon={active ? <IconCheck size={12} stroke={3} /> : <IconX size={12} stroke={3} />}
        />

        <Accordion.Control {...props} />
      </Box>
    );
  }

  const form = useForm({
    initialValues: {
      active: server.active,
      name: server.name,
      provider: server.provider,
      url: server.url,
      api_ping_url: server.api_ping_url,
      webhook_url: server.webhook_url,
    },
    validate: {},
  });

  return (
    <Accordion.Item
      sx={(theme) => ({
        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
        },
      })}
      value={server.id.toString()}
    >
      <EditAccordionControl>{server.name}</EditAccordionControl>
      <Accordion.Panel>
        <form
          onSubmit={() => {
            console.log("ok");
          }}
        >
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                placeholder="Server Name"
                variant="filled"
                radius="md"
                withAsterisk
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput placeholder="Provider" variant="filled" radius="md" {...form.getInputProps("provider")} />
            </Grid.Col>

            <Grid.Col>
              <TextInput
                placeholder="Frontend URL"
                variant="filled"
                radius="md"
                withAsterisk
                {...form.getInputProps("url")}
              />
            </Grid.Col>

            <Grid.Col>
              <TextInput
                placeholder="API URL"
                variant="filled"
                radius="md"
                withAsterisk
                {...form.getInputProps("api_ping_url")}
              />
            </Grid.Col>

            <Grid.Col>
              <TextInput
                placeholder="Webhook URL"
                variant="filled"
                radius="md"
                withAsterisk
                {...form.getInputProps("webhook_url")}
              />
            </Grid.Col>
          </Grid>
        </form>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
