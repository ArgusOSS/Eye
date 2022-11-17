import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  useMantineColorScheme,
} from "@mantine/core";
import { TablerIcon, IconCalendarStats, IconChevronLeft, IconChevronRight } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

export function LinksGroup({ icon: Icon, label, id, initiallyOpened, links, activeLink }) {
  const { classes, theme } = useStyles();
  const { colorScheme } = useMantineColorScheme();

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component="a"
      sx={() => ({
        backgroundColor:
          // eslint-disable-next-line no-nested-ternary
          activeLink === link.id
            ? colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2]
            : "transparent",
      })}
      className={classes.link}
      href={link.link}
      key={link.label}
    >
      {link.label}
    </Text>
  ));

  const isMainLinkActive = activeLink === id && !hasLinks;

  console.log("isMainLinkActive", isMainLinkActive, activeLink, id, hasLinks);

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        sx={() => ({
          // eslint-disable-next-line no-nested-ternary
          backgroundColor: isMainLinkActive
            ? colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2]
            : "transparent",
        })}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)` : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
