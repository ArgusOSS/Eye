import { useEffect, useState } from 'react';
import {
  Text, Accordion, Grid, Group, ActionIcon, Flex, Container, Modal, TextInput, Button,
} from '@mantine/core';
import { IconPlus, IconCheck } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import ServerSetting from './_serverSetting';
import { fetchServers } from '../../../api/servers';

function NewServerModal({ closeModal }) {
  const createNewServer = ((data) => {
    fetch('/api/servers/settings', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        closeModal();
      })
      .catch((e) => console.error(e));
  });

  const form = useForm({
    initialValues: {
      name: '',
      provider: '',
      url: '',
      api_ping_url: '',
      webhook_url: '',
    },
    validate: {

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
            {...form.getInputProps('name')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            placeholder="Provider"
            variant="filled"
            radius="md"
            {...form.getInputProps('provider')}
          />
        </Grid.Col>

        <Grid.Col>
          <TextInput
            placeholder="Frontend URL"
            variant="filled"
            radius="md"
            withAsterisk
            required
            {...form.getInputProps('url')}
          />
        </Grid.Col>

        <Grid.Col>
          <TextInput
            placeholder="API URL"
            variant="filled"
            radius="md"
            {...form.getInputProps('api_ping_url')}
          />
        </Grid.Col>

        <Grid.Col>
          <TextInput
            placeholder="Webhook URL"
            variant="filled"
            radius="md"
            {...form.getInputProps('webhook_url')}
          />
        </Grid.Col>
      </Grid>

      <Button
        variant="gradient"
        gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
        type="submit"
        sx={(theme) => ({
          marginTop: theme.spacing.md,
          float: 'right',
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
    fetchServers()
      .then((json) => setServers(json.results));
  }, []);

  const openNewServerModal = (() => {
    setNewServerModalOpened(true);
  });

  const onCloseNewServerModal = (async () => {
    setNewServerModalOpened(false);

    fetchServers()
      .then((json) => setServers(json.results));

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
  });

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
        <Text size="36px" weight={900}>SERVERS</Text>
        <ActionIcon onClick={openNewServerModal}><IconPlus /></ActionIcon>
      </Group>

      <Accordion
        variant="separated"
        radius="lg"
        sx={(theme) => ({
          marginTop: theme.spacing.md,
        })}
      >
        {servers.map((server) => <ServerSetting server={server} key={server.id} />)}
      </Accordion>
    </Container>
  );
}
