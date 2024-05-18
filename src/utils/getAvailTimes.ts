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
  
  // Create an interval between the start and end times
  const interval = Interval.fromDateTimes(start, end);
  
  // Split the interval into 15-minute segments
  const fifteenMinuteIntervals = interval.splitBy({ minutes: intervalLength });
  
  // Extract the start time of each segment
  return fifteenMinuteIntervals.map((segment) => segment.start.toFormat("hh:mma").toLowerCase());
}

export default getAvailTimes