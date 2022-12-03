import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Paper, Text, Center } from "@mantine/core";

export function LatencyGraph({ title, history, date }) {
  const [data, setData] = useState([]);

  const formatData = (entry) => {
    // let createdAt = parseInt(new Date(entry.created_at).getMinutes());
    const createdAt = new Date(entry.created_at).toLocaleTimeString();
    const latency = parseInt(entry.time_taken.split(".")[1], 10) / 1000000;

    return [createdAt, latency];
  };

  const hasNoData = () => {
    if (history === undefined) return true;
    if (history.count === 0) return true;

    return false;
  };

  useEffect(() => {
    if (history.results === undefined) return;

    setData([["Time", "Latency"], ...history.results.map((entry) => formatData(entry))]);
  }, [date, history]);

  const options = {
    chart: {
      title,
    },
    legend: {
      position: "none",
    },
  };

  if (hasNoData())
    return (
      <Center>
        <Text
          sx={(theme) => ({
            marginTop: theme.spacing.lg,
          })}
        >
          No data to display
        </Text>
      </Center>
    );

  return (
    <Paper
      sx={(theme) => ({
        padding: theme.spacing.lg,
        height: "100%",
      })}
    >
      <Chart
        chartType="Line"
        width="100%"
        height="400px"
        data={data}
        options={options}
        loader={<Text>Loading..</Text>}
        legendToggle
      />
    </Paper>
  );
}
