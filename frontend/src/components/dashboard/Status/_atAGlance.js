import { Text, Paper } from "@mantine/core";

export function AtAGlance() {
  return (
    <>
      <Text size="36px" weight={900}>
        AT A GLANCE
      </Text>
      <Paper
        sx={(theme) => ({
          padding: theme.spacing.md,
          marginTop: theme.spacing.md,
        })}
      >
        <Text>Test</Text>
      </Paper>
    </>
  );
}
