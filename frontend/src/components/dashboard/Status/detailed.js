/* eslint-disable no-shadow */
import { useState, useEffect } from "react";
import { Container, Text, Paper, Space } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { fetchServer, fetchHistory } from "../../../api/servers";
import { StatusCard } from "./_statusCard";
import { LatencyGraph } from "./_latencyGraph";

export function DashboardDetailedServerStatus({ idx }) {
  const [server, setServer] = useState({});
  const [history, setHistory] = useState({});

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (idx === undefined) return;

    fetchServer(idx).then((server) => {
      setServer(server);
    });
  }, [idx]);

  useEffect(() => {
    if (idx === undefined) return;

    let dateAsISO = date.toISOString().split("T")[0];

    fetchHistory(idx, dateAsISO).then((history) => {
      setHistory(history);
    });
  }, [idx, date]);

  const onChangeDate = (date) => {
    setDate(date);
  }

  return (
    <Container>
      <Text size="36px" weight={900}>
        {server.name}
      </Text>

      <StatusCard server={server} history={history} />

      <DatePicker sx={(theme) => ({
          marginTop: theme.spacing.lg,
        })} value={date} onChange={onChangeDate} />
      <Space h="lg" />

      <LatencyGraph server={server} history={history} date={date} />
    </Container>
  );
}
