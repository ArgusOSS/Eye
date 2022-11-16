import { createStyles, Text, Card, RingProgress, Group } from "@mantine/core";
import Link from "next/link";
// import { useEffect, useState } from 'react';
// import { fetchHistory } from '../../../api/servers';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

export function Server({ server }) {
  // eslint-disable-next-line no-unused-vars
  const { classes, theme } = useStyles();

  const successUp = (
    <Text style={{ fontSize: "12px" }} color="green">
      UP
    </Text>
  );

  const failureDown = (
    <Text style={{ fontSize: "12px" }} color="red">
      DOWN
    </Text>
  );

  const stats = [
    {
      label: "Frontend",
      value: server.frontend_last_ping_status === true ? successUp : failureDown,
    },
    {
      label: "API",
      value: server.api_last_ping_status === true ? successUp : failureDown,
    },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  // const getFrontendUptime = (() => Math.floor(Math.random() * 100));

  // const getAPIUptime = (() => Math.floor(Math.random() * 100));

  return (
    <Link href={`/dashboard/status/${server.id}`}>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <div className={classes.inner}>
          <div>
            <Text size="xl" className={classes.label}>
              {server.name}
            </Text>
            <Group mt="lg">{items}</Group>
          </div>

          <div className={classes.ring}>
            <RingProgress
              roundCaps
              thickness={6}
              size={150}
              sections={[{ value: server.frontend_percentage_uptime, color: "yellow" }]}
              label={
                <div>
                  <Text align="center" size="lg" className={classes.label} sx={{ fontSize: 22 }}>
                    {Math.round(server.frontend_percentage_uptime)}%
                  </Text>
                  <Text align="center" size="xs" color="dimmed">
                    Uptime
                  </Text>
                </div>
              }
            />
          </div>

          <div className={classes.ring}>
            <RingProgress
              roundCaps
              thickness={6}
              size={150}
              sections={[{ value: server.api_percentage_uptime, color: "orange" }]}
              label={
                <div>
                  <Text align="center" size="lg" className={classes.label} sx={{ fontSize: 22 }}>
                    {Math.round(server.api_percentage_uptime)}%
                  </Text>
                  <Text align="center" size="xs" color="dimmed">
                    API Uptime
                  </Text>
                </div>
              }
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
