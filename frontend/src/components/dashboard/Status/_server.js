import { createStyles, Text, Card, RingProgress, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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
    display: 'flex',

    [theme.fn.smallerThan(350)]: {
      flexDirection: 'column',
    },
  },

  ring: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.fn.smallerThan(350)]: {
      justifyContent: 'center',
      marginTop: theme.spacing.md,
    },
  },
}));

export function Server({ server }) {
  const { classes, theme } = useStyles();
//   const items = stats.map((stat) => (
//     <div key={stat.label}>
//       <Text className={classes.label}>{stat.value}</Text>
//       <Text size="xs" color="dimmed">
//         {stat.label}
//       </Text>
//     </div>
//   ));

    const getUptime = (() => {
        return Math.floor(Math.random() * 100);
    });

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text size="xl" className={classes.label}>
            {server.name}
          </Text>
          {/* <div>
            <Text className={classes.lead} mt={30}>
              {completed}
            </Text>
            <Text size="xs" color="dimmed">
              Completed
            </Text>
          </div> */}
          {/* <Group mt="lg">{items}</Group> */}
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: getUptime(), color: theme.primaryColor }]}
            label={
              <div>
                <Text align="center" size="lg" className={classes.label} sx={{ fontSize: 22 }}>
                  {getUptime()}%
                </Text>
                <Text align="center" size="xs" color="dimmed">
                  Uptime
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}