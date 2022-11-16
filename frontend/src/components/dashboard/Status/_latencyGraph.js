// import { Text } from '@mantine/core';
import { Chart } from "react-google-charts";

export function LatencyGraph({ server, history }) {
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

  // console.log(server, history);
  const data = [
    ["Day", "Guardians of the Galaxy", "The Avengers", "Transformers: Age of Extinction"],
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
  //                 amt: new Date(history[i].latency),
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
      <Chart chartType="Line" width="100%" height="400px" data={data} options={options} />
    </div>
  );
}
