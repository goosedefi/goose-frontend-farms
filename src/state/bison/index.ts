/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { BisonState } from '../types'

const initialState: BisonState = { data: { price: 0, totalSupply: 0 } }

export const bisonSlice = createSlice({
  name: 'Bison',
  initialState,
  reducers: {
    setPriceData: (state, action) => {
      const priceData = action.payload
      return { data: { ...state.data, price: priceData } }
    },
    setTotalSupplyData: (state, action) => {
      const totalSupplyData = action.payload
      return { data: { ...state.data, totalSupply: totalSupplyData } }
    },
  },
})

// Actions
export const { setPriceData, setTotalSupplyData } = bisonSlice.actions

// Thunks
export const fetchPriceDataAsync = () => async (dispatch) => {
  let BISONValue = 0
  await fetch(
    'https://api.stosentertainment.com/price-bnbpool.php?key=236547643&pool=0xe0e3f3698ba35487e5285fdfd31a5b8d8f564d8b&token=0x9eab0a93b0cd5d904493694f041bdcedb97b88c6&decimals=18',
  )
    .then((res) => res.json())
    .then(
      (result) => {
        if (result.status === true) {
          BISONValue = 4
        } else {
          BISONValue = 0
        }
      },
      (error) => {
        BISONValue = 0
      },
    )
    .catch(() => {
      BISONValue = 0
    })
  dispatch(setPriceData(BISONValue))
}

export const fetchTotalSupplyDataAsync = () => async (dispatch) => {
  let totalSupplyValue = 0
  await fetch(
    'https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=0x9eab0a93b0cd5d904493694f041bdcedb97b88c6&apikey=5E61V2DWBJANXNURC6Q991F828E6W5KX1P&decimals=18',
  )
    .then((res) => res.json())
    .then(
      (result) => {
        if (result.status === '1') {
          totalSupplyValue = result.result / 10 ** 18
        } else {
          totalSupplyValue = 0
        }
      },
      (error) => {
        totalSupplyValue = 0
      },
    )
    .catch(() => {
      totalSupplyValue = 0
    })
  dispatch(setTotalSupplyData(totalSupplyValue))
}

export default bisonSlice.reducer
