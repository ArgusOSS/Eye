import { createStyles, Text, Card, RingProgress, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,

    '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      }
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

 const stats = [
    { label: 'Previous Latency', value: '12ms' },
 ]

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

    const getFrontendUptime = (() => {
        return Math.floor(Math.random() * 100);
    });

    const getAPIUptime = (() => {
        return Math.floor(Math.random() * 100);
    });

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text size="xl" className={classes.label}>
            {server.name}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              0.7
            </Text>
            <Text size="xs" color="dimmed">
                Reliability Index
            </Text>
          </div>

          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: getFrontendUptime(), color: 'yellow' }]}
            label={
              <div>
                <Text align="center" size="lg" className={classes.label} sx={{ fontSize: 22 }}>
                  {getFrontendUptime()}%
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
            sections={[{ value: getAPIUptime(), color: 'orange' }]}
            label={
              <div>
                <Text align="center" size="lg" className={classes.label} sx={{ fontSize: 22 }}>
                  {getAPIUptime()}%
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
  );
}