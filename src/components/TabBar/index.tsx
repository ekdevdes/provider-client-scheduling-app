// Libs
import { FC } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { connect } from "react-redux";
import { ActionTypes, AppState } from '../../types'

// Material components
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FaceIcon from '@mui/icons-material/Face6';
import Paper from '@mui/material/Paper';

type TabBarProps = {
  activeTabIndex: number
  updateActiveTabIndex: (tabIndex: number) => void
}

const TabBar: FC<TabBarProps> = ({ activeTabIndex, updateActiveTabIndex }) => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <Box>
        <BottomNavigation
          showLabels
          value={activeTabIndex}
          onChange={(e, selectedTabIndex: number) => {
            updateActiveTabIndex(selectedTabIndex)
          }}
        >
          <BottomNavigationAction label="Providers" icon={<FaceIcon />} />
          <BottomNavigationAction label="Clients" icon={<PersonSearchIcon />} />
        </BottomNavigation>
      </Box>
    </Paper>
  )
}

const mapStateToProps = (state: AppState) => ({
    activeTabIndex: state.activeTabIndex
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateActiveTabIndex: (tabIndex: number) => dispatch({
      type: ActionTypes.UPDATE_ACTIVE_TAB_INDEX, 
      payload: {
        tabIndex
      } 
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabBar)