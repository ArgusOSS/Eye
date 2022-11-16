/* eslint-disable no-shadow */
import { useState, useEffect } from "react";
import { Container, Text, Paper } from "@mantine/core";
// import { useRouter } from 'next/router';
import { fetchServer, fetchHistory } from "../../../api/servers";
import { StatusCard } from "./_statusCard";
import { LatencyGraph } from "./_latencyGraph";

export function DashboardDetailedServerStatus({ idx }) {
  const [server, setServer] = useState({});
  const [history, setHistory] = useState({});

  useEffect(() => {
    if (idx === undefined) return;

    fetchServer(idx).then((server) => {
      setServer(server);
    });

    fetchHistory(idx).then((history) => {
      setHistory(history);
    });
  }, [idx]);

  return (
    <Container>
      <Text size="36px" weight={900}>
        {server.name}
      </Text>

      <Paper
        sx={(theme) => ({
          marginTop: theme.spacing.md,
        })}
      >
        <StatusCard server={server} history={history} />
        <LatencyGraph server={server} history={history} />
      </Paper>
    </Container>
  );
}
