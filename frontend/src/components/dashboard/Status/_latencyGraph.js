// import { Text } from '@mantine/core';
import { Flex } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { Chart } from "react-google-charts";

export function LatencyGraph({ server, history }) {
  // return (
  //   <div>
  //     <br />
  //     <br />
  //     <br />
  //     <GitHubCalendar username="abheektripathy" color="orange" />
  //   </div>
  // );

  // Get most recent history logs
  // const recentHistory = history === undefined ? [] :
  // history.slice(Math.max(history.length - 10, 0));
  // let created_ats = [];
  // for (let i = 0; i < history.length; i++) {
  //     // parse ISO 8601 date string
  //     let date = new Date(history[i].created_at);
  //     created_ats.push(date);
  //     console.log(date)
  // }
  // console.log(server, histor y);
  const data = [
    ["Day", "ok", "ok", "ok"],
    [1, 37.8, 80.8, 41.8],
    [2, 30.9, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
  ];
  // let data = [];
  // for (let i = 0; i < history.length; i++) {
  //     data.push(
  //         {
  //                 uv: new Date(history[i].created_at),
  //                 pv: new Date(history[i].latency),
  //                 amt: new Date(histreory[i].latency),
  //         }
  //     );
  // }
  const options = {
    chart: {
      title: "Latency of your services",
      subtitle: "API endpoints",
    },
  };
  return (
    <div>
      <br />
      <Flex direction={{ base: "column", sm: "row" }} gap={{ base: "sm", sm: "lg" }} justify={{ sm: "center" }}>
        <br />
        <Calendar />
        <br />

        <Chart chartType="Line" width="100%" height="400px" data={data} options={options} />
        <br />
      </Flex>
      <br />
      <br />
    </div>
  );
}
