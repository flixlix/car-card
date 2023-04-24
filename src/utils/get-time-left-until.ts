export function getTimeLeftUntil(futureDateTimeString?: string): string {
  if (!futureDateTimeString) {
    return "No date time provided.";
  }
  const futureDateTime = new Date(futureDateTimeString.replace(" ", "T"));
  const now = new Date();
  const timeLeftInMilliseconds = futureDateTime.getTime() - now.getTime();

  if (timeLeftInMilliseconds < 0) {
    return "The provided date time is in the past.";
  }

  const totalSecondsLeft = Math.floor(timeLeftInMilliseconds / 1000);
  const daysLeft = Math.floor(totalSecondsLeft / (24 * 60 * 60));
  const hoursLeft = Math.floor((totalSecondsLeft % (24 * 60 * 60)) / (60 * 60));
  const minutesLeft = Math.floor((totalSecondsLeft % (60 * 60)) / 60);
  const secondsLeft = Math.floor(totalSecondsLeft % 60);

  const measures: string[] = [];

  if (daysLeft > 0) {
    measures.push(`${daysLeft} day${daysLeft > 1 ? "s" : ""}`);
  }

  if (hoursLeft > 0) {
    measures.push(`${hoursLeft} hour${hoursLeft > 1 ? "s" : ""}`);
  }

  if (minutesLeft > 0) {
    measures.push(`${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}`);
  }

  if (measures.length === 0) {
    measures.push(`${secondsLeft} second${secondsLeft > 1 ? "s" : ""}`);
  }

  const twoLargestMeasures = measures.slice(0, 2).join(" and ");

  return `${twoLargestMeasures  } left`;
}
