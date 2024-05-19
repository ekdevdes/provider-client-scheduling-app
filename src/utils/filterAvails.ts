import { Availability } from "../types"
import { DateTime } from 'luxon'

/**
 * Removes any availabilities that are 24 hours before the current date
 * 
 * @param avails Array of availability objects to sort through
 * @returns Filtered list of availabilities that are <24 hours before the current date
 */
const filterAvails = (avails: Availability[]): Availability[] => {
  // First we need to know what time tomorrow can we *not* book appts before
  const thisTimeTomorrow = DateTime.local().plus({ day: 1 })

  // Then we'll just look through all the avails we got passed in and see which are *after* the first time we can book clients
  return avails.filter(avail => {
    const dayDate = DateTime.fromFormat(
      `${avail.day} ${avail.startTime}`, 
      'EEE, M/d hh:mma'
    )

    return dayDate > thisTimeTomorrow
  })
}

export default filterAvails