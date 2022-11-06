const fetchServers = (async () => {
    try {
        const resp = await fetch('/api/servers/settings')
        return await resp.json()
    } catch (e) {
        console.error(e)
    }
})

export { fetchServers }