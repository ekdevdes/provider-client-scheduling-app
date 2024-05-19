import { DateTime } from 'luxon'

/**
 * Helper to generate pretty date strings like 'Fri, 5/19' for the availability drop downs
 * 
 * @param numberOfDays Number of days in the future get availability for
 * @returns An array of date strings formatted like 'Fri, 5/19' with one entry for each `numberOfDays`
 */
const getAvailDays = (numberOfDays: number): string[] => {
  const today = DateTime.now()

  // Helps us get how many days are between now and `numberOfDays` using luxon to format them like 'Fri, May 19'
  const days = Array.from({ length: numberOfDays }, (el, i) => {
    const futureDay = today.plus({ days: i })

    return futureDay.toFormat('EEE, M/d')
  })

  return days
}

export default getAvailDays
