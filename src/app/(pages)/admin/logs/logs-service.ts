export const logsService = {
    getLogs,
    getDateFromFilter,
    getLogsByDate
}

export enum FilterTypes {
    TODAY = "today",
    YESTERDAY = "yesterday",
    THREE_DAYS = "three-days",
    FOUR_DAYS = "four-days",
    FIVE_DAYS = "five-days",
    SIX_DAYS = "six-days",
    SEVEN_DAYS = "seven-days",
    CUSTOM = "custom",
}

async function getLogs(cursor?: string, next: boolean = false) {
    let url = cursor ? "/api/logs?cursor=" + cursor : "/api/logs";
    url = next ? url + "&next=true" : url;
    return fetch(url)
        .then((res) => res.json())
}

async function getLogsByDate(date: string) {
    return fetch("/api/logs?startDate=" + date)
        .then((res) => res.json())
}

function getDateFromFilter(filter: FilterTypes) {
    switch (filter) {
        case FilterTypes.TODAY:
            return ""
        case FilterTypes.YESTERDAY:
            return new Date(new Date().setHours(0, 0, 0, 0) - 1 * 24 * 60 * 60 * 1000).toISOString();
        case FilterTypes.THREE_DAYS:
            return new Date(new Date().setHours(0, 0, 0, 0) - 3 * 24 * 60 * 60 * 1000).toISOString();
        case FilterTypes.FOUR_DAYS:
            return new Date(new Date().setHours(0, 0, 0, 0) - 4 * 24 * 60 * 60 * 1000).toISOString();
        case FilterTypes.FIVE_DAYS:
            return new Date(new Date().setHours(0, 0, 0, 0) - 5 * 24 * 60 * 60 * 1000).toISOString();
        case FilterTypes.SIX_DAYS:
            return new Date(new Date().setHours(0, 0, 0, 0) - 6 * 24 * 60 * 60 * 1000).toISOString();
        case FilterTypes.SEVEN_DAYS:
            return new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000).toISOString();
        case FilterTypes.THREE_DAYS:
            return new Date(new Date().setHours(0, 0, 0, 0) - 3 * 24 * 60 * 60 * 1000).toISOString();
        case FilterTypes.SEVEN_DAYS:
            return new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000).toISOString();
        case FilterTypes.CUSTOM:
            return "";
    }
}