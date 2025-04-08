import { dateTimeFormatterFromJSDDate } from "./dateTimeFormatter";

const getElapsedDateTime = (createdAt: Date) => {
  const now = new Date();
  const create = new Date(createdAt);
  const diff = now.getTime() - create.getTime();
  const minutes = Math.floor(diff / (60 * 1000));
  if (minutes < 60) {
    const ret = minutes.toString();
    return ret + "mins ago";
  } else if (minutes < 60 * 24) {
    const hours = Math.floor(minutes / 60);
    const ret = hours.toString();
    return ret + "hours ago";
  } else if (minutes < 60 * 24 * 7) {
    const days = Math.floor(minutes / (60 * 24));
    const ret = days.toString();
    return ret + "days ago";
  } else if (minutes < 60 * 24 * 30) {
    const weeks = Math.floor(minutes / (60 * 24 * 7));
    const ret = weeks.toString();
    return ret + "weeks ago";
  } else {
    const formedDateTime = dateTimeFormatterFromJSDDate({
      dateTime: new Date(create),
      format: "yyyy/LL/dd",
    });
    return formedDateTime;
  }
};

export default getElapsedDateTime;
