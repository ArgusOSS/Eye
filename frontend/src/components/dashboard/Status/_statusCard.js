import { createStyles, Text } from "@mantine/core";
import { useState, useEffect } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 5,
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

export function StatusCard({ server, frontendHistory, apiHistory }) {
  const { classes } = useStyles();
  const [data, setData] = useState([]);

  const getMeanUptimePercentage = () =>
    (parseFloat(server.frontend_percentage_uptime) + parseFloat(server.api_percentage_uptime)) / 2;

  useEffect(() => {
    if (server === undefined || frontendHistory === undefined || apiHistory === undefined) return;

    console.debug(getMeanUptimePercentage());
    // eslint-disable-next-line no-shadow
    const data = [
      {
        stats: frontendHistory.count + apiHistory.count,
        title: "Total Pings",
        description: "The total number of pings ever sent by the server to this service.",
      },
      {
        stats: `${Number(getMeanUptimePercentage()).toFixed(2)}%`,
        title: "Uptime Percentage",
        description: "This is the mean uptime percentage of the frontend and the API",
      },
    ];

    setData(data);
  }, [frontendHistory, apiHistory, server]);

  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));

  return <div className={classes.root}>{stats}</div>;
}
