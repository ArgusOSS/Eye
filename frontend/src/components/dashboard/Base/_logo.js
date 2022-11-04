import { Text } from '@mantine/core';

export function Logo() {
    return (
        <Text
            variant="gradient"
            gradient={{ from: 'red', to: 'yellow', deg: 45 }}
            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
            ta="center"
            fz="xl"
            fw={800}
        >
            Eye.
        </Text>
    );
}