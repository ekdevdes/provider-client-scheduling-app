import React, { FC , useState, useEffect, useRef } from 'react'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import clone from 'lodash/cloneDeep'

import { Availability } from '../../../types'
import generateRandomNumber from '../../../utils/generateRandomNumber'

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
  const id = useRef<number>(generateRandomNumber())
  const [day, setDay] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  useEffect(() => {
    // does our curent set of avail info exist already?
    const currentAvail = find(avails, { id: id.current })

    // current set of avail info doesn't exist in the form component :(
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
      // If it does exist then we have to find its index before we can update
      // But since react state update is memory based we  have to copy the array first
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
            {availDays.map(day => (
              <MenuItem value={day}>{day}</MenuItem>
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
            {availTimes.map(time => (
              <MenuItem value={time}>{time}</MenuItem>
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
            {/* Using slice here to not allow the provider to be able to set times from 8am to 8am */}
            {availTimes.slice(1).map(time => (
              <MenuItem value={time}>{time}</MenuItem>
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
          }}>Remove</Button>
      </Box>
    </>
  )
}

export default TimeSlot