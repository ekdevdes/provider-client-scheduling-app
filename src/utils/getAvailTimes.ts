import { DateTime, Interval } from "luxon"

/**
 * Given a start date like '8am' and end time like '8pm' calculates how many `intervalLength` periods between then
 * 
 * @param startTime Time availability range should start (e.g. '8am')
 * @param endTime Time availability range should end (e.g. '8pm')
 * @returns An array of strings of however many time `intervalLength` periodsa are between `startTime` and `endTime`
 */
const getAvailTimes = (
  startTime: string, 
  endTime: string, 
  intervalLength: number
): string[] => {
  const start = DateTime.fromFormat(startTime, "ha");
  const end = DateTime.fromFormat(endTime, "ha");
  
  // Helps us find how many 15 minute periods are between the start and end date
  const interval = Interval.fromDateTimes(start, end);
  const fifteenMinuteIntervals = interval.splitBy({ minutes: intervalLength });
  
  // Then we just need to get the start time for each one of those periods, removing any potentially null values along the way
  return fifteenMinuteIntervals
    .map((segment) => segment.start?.toFormat("hh:mma").toLowerCase() || '') 
    .filter(Boolean)
}

export default getAvailTimes