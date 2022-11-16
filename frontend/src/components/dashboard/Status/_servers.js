import { Text, SimpleGrid, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchServers } from "../../../api/servers";
import { Server } from "./_server";

export function Servers() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    fetchServers().then((json) => setServers(json.results));
  }, []);

  return (
    <>
      <Text size="36px" weight={900}>
        SERVERS
      </Text>

      <Paper
        sx={(theme) => ({
          padding: theme.spacing.md,
          marginTop: theme.spacing.md,
        })}
      >
        {servers.length > 0 ? (
          <SimpleGrid cols={2}>
            {servers.map((server) => (
              <Server server={server} />
            ))}
          </SimpleGrid>
        ) : (
          <Text>No servers available.</Text>
        )}
      </Paper>
    </>
  );
}
