import { DateTime } from "luxon";

export function dateTimeFormatterFromJSDDate({
  dateTime,
  format = "yyyy/LL/dd HH:mm",
}: {
  dateTime: Date;
  format?: string;
}): string {
  return DateTime.fromJSDate(dateTime, { zone: "Asia/Tokyo" }).toFormat(format);
}

export function dateTimeFormatterFromJSDDateWithoutTime({
  dateTime,
  format = "yyyy/LL/dd",
}: {
  dateTime: Date;
  format?: string;
}): string {
  return DateTime.fromJSDate(dateTime, { zone: "Asia/Tokyo" }).toFormat(format);
}
