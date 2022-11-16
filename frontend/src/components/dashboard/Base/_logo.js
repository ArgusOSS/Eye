import { Text } from "@mantine/core";

export function Logo() {
  return (
    <Text
      variant="gradient"
      gradient={{ from: "yellow", to: "red", deg: 45 }}
      // sx={{ fontFamily: 'Verdana, sans-serif', }}
      ta="center"
      // fz="xl"
      // fw={900}
      size={36}
      weight={900}
    >
      Eye.
    </Text>
  );
}
