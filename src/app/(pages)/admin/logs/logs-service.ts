export const logsService = {
    getLogs,
}

async function getLogs(cursor?: string) {
    const url = cursor ? "/api/logs?cursor=" + cursor : "/api/logs";
    return fetch(url)
        .then((res) => res.json())
}