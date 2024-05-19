// Libs
import React, { FC , useState, useEffect, useRef } from 'react'
import { Availability } from '../../../types'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import clone from 'lodash/cloneDeep'

// Helpers
import generateRandomNumber from '../../../utils/generateRandomNumber'

// Material components
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type TimeSlotProps = {
  timeSlots: number
  availDays: string[]
  availTimes: string[]
  avails: Availability[]
  setTimeSlots: React.Dispatch<React.SetStateAction<number>>
  setAvails: React.Dispatch<React.SetStateAction<Availability[]>>
} 

const TimeSlot: FC<TimeSlotProps> = ({ 
  timeSlots, 
  availDays, 
  availTimes,
  avails,
  setTimeSlots,
  setAvails,
}) => {
  // We need an id to help determine if the current set of availability info has been saved before or not
  const id = useRef<number>(generateRandomNumber())

  // Then we just have a few props here for the values of the various dropdowns
  const [day, setDay] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  useEffect(() => {
    // Does this availability info already exist in the parent ProviderForm component?
    const currentAvail = find(avails, { id: id.current })

    // If not then we have to save it
    if (isEmpty(currentAvail)) {
      setAvails([
        ...avails,
        {
          id: id.current,
          day,
          startTime,
          endTime
        }
      ])
    } else {
      // If so, then we have to find the index, clone the array (b/c react's updates are memory address based), do the update 
      // and then set the current availability info to the clone we just created
      const _avails = clone(avails)
      const currentAvailIndex = findIndex(_avails, { id: id.current })

      _avails[currentAvailIndex] = {
        id: id.current,
        day,
        startTime,
        endTime
      }

      setAvails(_avails)
    }
  }, [day, startTime, endTime])

  return (
    <>
      <Box>
        <FormControl sx={{ mr: 1, width: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Day</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={day}
            label="Day"
            onChange={(e: SelectChangeEvent) => {
              if (!isEmpty(e.target.value)) {
                setDay(e.target.value)
              }
            }}
          >
            {availDays.map((day, i) => (
              <MenuItem value={day} key={`day-${i}`}>{day}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mr: 1, width: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Start Time</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={startTime}
            label="Start Time"
            onChange={(e: SelectChangeEvent) => {
              if (!isEmpty(e.target.value)) {
                setStartTime(e.target.value)
              }
            }}
          >
            {availTimes.map((time, i) => (
              <MenuItem value={time} key={`start-${i}`}>{time}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">End Time</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={endTime}
            label="End Time"
            onChange={(e: SelectChangeEvent) => {
              if (!isEmpty(e.target.value)) {
                setEndTime(e.target.value)
              }
            }}
          >
            {/* The `slice` here helps ensure the provider can't set their availability to 8am to 8am */}
            {availTimes.slice(1).map((time, i) => (
              <MenuItem value={time} key={`end-${i}`}>{time}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", mr: 1 }}>
        <Button 
          variant="text" 
          sx={{ ml: "auto", color: "error.main" }}
          onClick={() => {
            setTimeSlots(timeSlots - 1)
          }}
        >
          Remove
        </Button>
      </Box>
    </>
  )
}

export default TimeSlot