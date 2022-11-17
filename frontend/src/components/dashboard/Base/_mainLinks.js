import { createStyles } from "@mantine/core";
import { IconActivity, IconTool } from "@tabler/icons";

import { LinksGroup } from "./_linksGroup";

const destinations = [
  {
    label: "Status",
    icon: IconActivity,
    initiallyOpened: true,
    id: "status",
    links: [
      { label: "Projects", id: "status-projects", link: "/dashboard/status/projects" },
      { label: "Servers", id: "status-servers", link: "/dashboard/status/servers" },
    ],
  },
  {
    label: "Settings",
    icon: IconTool,
    id: "settings",
    initiallyOpened: true,
    links: [
      { label: "Projects", id: "settings-projects", link: "/dashboard/settings/projects" },
      { label: "Servers", id: "settings-servers", link: "/dashboard/settings/servers" },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}));

export function MainLinks(props) {
  const { classes } = useStyles();
  // eslint-disable-next-line react/jsx-props-no-spreading
  const links = destinations.map((item) => <LinksGroup {...item} key={item.label} activeLink={props.activeLink} />);

  return <div className={classes.linksInner}>{links}</div>;
}
