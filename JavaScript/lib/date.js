/* eslint-disable */
export const ONE_DAY = 86400000;

export const TODAY = getOffsetDayDate();

export const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7];

export function getDateTime(date = new Date()) {
    let arr = new Array(6);
    arr[0] = date.getFullYear();
    arr[1] = date.getMonth() + 1;
    arr[2] = date.getDate();
    arr[3] = date.getHours();
    arr[4] = date.getMinutes();
    arr[5] = date.getSeconds();
    arr = arr.map(item => item < 10 ? `0${item}` : item);
    return `${arr.slice(0, 3).join('-')} ${arr.slice(3).join(':')}`;
}

export function getOffsetDayDate(offset = 0, start = new Date()) {
    const times = start.getTime();
    const date = new Date(offset * ONE_DAY + times);
    return getDateTime(date).slice(0, 10);
}

export function getOffsetMonthDate(offset, date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const monthLastDay = new Date(new Date(year, month + offset + 1, 1, 12, 10, 10) - ONE_DAY).getDate();
    if (day > monthLastDay) date.setDate(monthLastDay);
    date.setMonth(month + offset);
    return getDateTime(date).slice(0, 10);
}

export function toFormatDate(string) {
    const args = string.split(/[-:\s]/);
    args[1] -= 1;
    return new Date(...args);
}
