/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React from "react";
import { IconActivity, IconTool } from "@tabler/icons";
import { ThemeIcon, UnstyledButton, Group, Text, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";

function MainLink({ icon, color, label, is_active, dest }) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Link href={dest}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          // eslint-disable-next-line no-nested-ternary
          backgroundColor: is_active
            ? colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2]
            : "transparent",

          "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm" style={{ fontWeight: "bolder" }}>
            {label}
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const data = [
  {
    icon: <IconActivity size={16} />,
    color: "blue",
    label: "Status",
    dest: "/dashboard/status",
  },
  {
    icon: <IconTool size={16} />,
    color: "teal",
    label: "Settings",
    dest: "/dashboard/settings",
  },
];

export function MainLinks({ activeLink }) {
  const links = data.map((link) => <MainLink {...link} key={link.label} is_active={link.label === activeLink} />);
  return <div>{links}</div>;
}
