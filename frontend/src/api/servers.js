/* eslint-disable consistent-return */
const fetchServers = async () => {
  try {
    const resp = await fetch("/api/servers/settings");
    return await resp.json();
  } catch (e) {
    console.error(e);
  }
  return null;
};

const fetchServer = async (id) => {
  try {
    const resp = await fetch(`/api/servers/settings/${id}`);
    return await resp.json();
  } catch (e) {
    console.error(e);
  }
};

const fetchHistory = async (id, date, mode) => {
  try {
    const resp = await fetch(`/api/servers/history?server_id=${id}&date=${date}&mode=${mode}`);
    return await resp.json();
  } catch (e) {
    console.error(e);
  }
};

export { fetchServers, fetchServer, fetchHistory };
