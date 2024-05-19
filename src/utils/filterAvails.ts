import { Availability } from "../types"
import { DateTime } from 'luxon'

/**
 * Removes any availabilities that are 24 hours before the current date
 * 
 * @param avails Array of availability objects to sort through
 * @returns Filtered list of availabilities that are <24 hours before the current date
 */
const filterAvails = (avails: Availability[]): Availability[] => {
  const thisTimeTomorrow = DateTime.local().plus({ day: 1 })

  return avails.filter(avail => {
    const dayDate = DateTime.fromFormat(
      `${avail.day} ${avail.startTime}`, 
      'EEE, M/d hh:mma'
    )

    return dayDate > thisTimeTomorrow
  })
}

export default filterAvails