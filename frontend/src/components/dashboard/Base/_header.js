import { Header, Group, useMantineColorScheme, ActionIcon } from '@mantine/core';
import { Logo } from "./_logo";
import { IconMoon, IconMoonStars } from '@tabler/icons';


export function BaseDashboardHeader() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme('dark');

    return (
        <Header height={60}>
            <Group sx={{ height: '100%' }} px={20} position="apart">
            <Logo colorScheme={colorScheme} />
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
                </ActionIcon>
            </Group>
        </Header>
    )
}