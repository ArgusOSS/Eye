import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export function LatencyGraph({ server, history }) {
    // Get most recent history logs
    // const recentHistory = history === undefined ? [] : history.slice(Math.max(history.length - 10, 0));
    // let created_ats = [];
    // for (let i = 0; i < history.length; i++) {
    //     // parse ISO 8601 date string
    //     let date = new Date(history[i].created_at);
    //     created_ats.push(date);
    //     console.log(date)
    // }

    let parsed_history = [];
    for (let i = 0; i < history.length; i++) {
        parsed_history.push({
            created_at: new Date(history[i].created_at),
            latency: new Date(history[i].latency)
        });
    }

    let options = {
        chart: {
          id: 'latency'
        },
        xaxis: {
            min: new Date('7 Nov 2022').getTime(),
            max: new Date().getTime()
        }
        // xaxis: {
        // categories: parsed_history.map((item) => item.created_at.getMinutes())
        // }
    };

    let series = [{
        name: 'series-1',
        data: parsed_history.map((item) => item.latency.getSeconds())
    }];

    return (
        <ApexCharts options={options} series={series} type="line" width={500} height={320} />
    );
}