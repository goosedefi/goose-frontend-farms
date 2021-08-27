/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import isArchivedPid from 'utils/farmHelpers'
import {farmsConfig} from 'config/constants/farms'
import fetchFarms from './fetchFarms'

import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { FarmsState, Farm } from '../types'


export const nonArchivedFarms = farmsConfig.filter(({ pid }) => !isArchivedPid(pid))

const initialState: FarmsState = { data: [...farmsConfig], loadArchivedFarmsData: true, userDataLoaded: true }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData } = farmsSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms(farmsConfig)
  dispatch(setFarmsPublicData(farms))
}
export const fetchFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchFarmUserAllowances(account, farmsConfig)
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsConfig)
  const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsConfig)
  const userFarmEarnings = await fetchFarmUserEarnings(account, farmsConfig)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}

export default farmsSlice.reducer