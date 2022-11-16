/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import {
  Text,
  Accordion,
  Grid,
  Group,
  ActionIcon,
  Container,
  Modal,
  TextInput,
  Button,
} from "@mantine/core";
import { IconPlus, IconCheck } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';

import ServerSetting from "./_serverSetting";






import { fetchServers } from '../../../api/servers';

const URLRegex = new RegExp(
  '^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$',
  'i',
);

export default function Servers() {
  const [servers, setServers] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    fetchServers().then((json) => setServers(json.results));
  }, []);

  return (
    <>
      <Text size="36px" weight={900}>
        SERVERS
      </Text>

      <Group position="end">
        <ActionIcon
          onClick={() => setModalOpened(true)}
          color="blue"
          radius="xl"
          variant="filled"
          size="xl"
          withTooltip
          tooltipLabel="Add Server"
        >
          <IconPlus />
        </ActionIcon>
      </Group>

      <Container
        sx={(theme) => ({
          marginTop: theme.spacing.md,
        })}
      >
        <Accordion
          data={servers}
          renderPanel={(server) => ({
            title: server.name,
            children: <ServerSetting server={server} />,
          })}
        />
      </Container>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Add New Server"
        size="sm"
      >
        <NewServerModal closeModal={() => setModalOpened(false)} />
      </Modal>
    </>
  );
}

// Path: frontend/src/components/dashboard/Settings/_serverSetting.js
// Compare this snippet from frontend/src/components/dashboard/Status/_server.js:
// import { useState } from "react";
// import {
//   Text,
//   SimpleGrid,
//   Paper,
//   Group,
//   ActionIcon,
//   Container,
// } from "@mantine/core";
// import { IconPlus, IconCheck }

const showSuccessNotification = () => {
  showNotification({
    title: 'Server added Successfully',
    icon: <IconCheck />,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.blue[6],
        borderColor: theme.colors.blue[6],

        '&::before': { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors.blue[7] },
      },
    }),
  });
};

function NewServerModal({ closeModal }) {
  const createNewServer = (data) => {
    fetch('/api/servers/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((json) => {
        closeModal();
        showSuccessNotification();
      })
      .catch((e) => console.error(e));
  };

  const form = useForm({
    initialValues: {
      name: "",
      provider: "",
      url: "",
      api_ping_url: "",
      webhook_url: "",
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Name must be at least 3 characters' : null),
      url: (value) => (URLRegex.test(value) ? null : 'URL must be a valid URL'),
      api_ping_url: (value) => (value.length === 0 ? null : URLRegex.test(value) ? null : 'URL must be a valid URL'),
      webhook_url: (value) => (value.length === 0 ? null : URLRegex.test(value) ? null : 'URL must be a valid URL'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => createNewServer(values))}>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            placeholder="Server Name"
            variant="filled"
            radius="md"
            withAsterisk
            required
            data-autofocus
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            placeholder="Provider"
            variant="filled"
            radius="md"
            {...form.getInputProps("provider")}
          />
        </Grid.Col>

        <Grid.Col>
          <TextInput
            placeholder="Frontend URL"
            variant="filled"
            radius="md"
            withAsterisk
            required
            {...form.getInputProps("url")}
          />
        </Grid.Col>

        <Grid.Col>
          <TextInput
            placeholder="API URL"
            variant="filled"
            radius="md"
            {...form.getInputProps("api_ping_url")}
          />
        </Grid.Col>

        <Grid.Col>
          <TextInput
            placeholder="Webhook URL"
            variant="filled"
            radius="md"
            {...form.getInputProps("webhook_url")}
          />
        </Grid.Col>
      </Grid>

      <Button
        variant="gradient"
        gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
        type="submit"
        sx={(theme) => ({
          marginTop: theme.spacing.md,
          float: "right",
        })}
      >
        ADD
      </Button>
    </form>
  );
}

export function DashboardSettings() {
  const [newServerModalOpened, setNewServerModalOpened] = useState(false);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    fetchServers().then((json) => setServers(json.results));
  }, []);

  const openNewServerModal = () => {
    setNewServerModalOpened(true);
  };

  const onCloseNewServerModal = async () => {
    setNewServerModalOpened(false);

    fetchServers().then((json) => {
      setServers(json.results);
    });
  };

  return (
    <Container>
      <Modal
        opened={newServerModalOpened}
        onClose={onCloseNewServerModal}
        title="Add Server"
        centered
      >
        <NewServerModal closeModal={setNewServerModalOpened} />
      </Modal>

      <Group position="apart">
        <Text size="36px" weight={900}>
          SERVERS
        </Text>
        <ActionIcon onClick={openNewServerModal}>
          <IconPlus />
        </ActionIcon>
      </Group>

      <Accordion
        variant="separated"
        radius="lg"
        sx={(theme) => ({
          marginTop: theme.spacing.md,
        })}
      >
        {servers.map((server) => (
          <ServerSetting server={server} key={server.id} />
        ))}
      </Accordion>
    </Container>
  );
}
