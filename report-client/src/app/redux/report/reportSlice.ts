import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import config from '../../config'

const initialState: {
  reports: any[]
  myReports: any[]
  group: any[]
  ErrorMessage: string
  SuccessMessage: string
} = {
  reports: [],
  myReports: [],
  group: [],
  ErrorMessage: '',
  SuccessMessage: '',
}

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    resetMsg: (state) => {
      state.SuccessMessage = ''
      state.ErrorMessage = ''
    },
    ErrorMsg: (state, action: PayloadAction<string>) => {
      state.ErrorMessage = action.payload
      state.SuccessMessage = ''
    },
    SuccessMsg: (state, action: PayloadAction<string>) => {
      state.SuccessMessage = action.payload
      state.ErrorMessage = ''
    },
    setReports: (state, action: PayloadAction<any[]>) => {
      state.reports = action.payload
    },
    setMyReports: (state, action: PayloadAction<any[]>) => {
      state.myReports = action.payload
    },
 
  },
})





export const createReportAsync = (data: any, auth: any) => async (
  dispatch: any,
) => {
  try {
    dispatch(resetMsg())
    const response = await axios.post(
      `${config.API_URL}/createreportByUser`,
      data,
      {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      },
    )
    dispatch(SuccessMsg(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(ErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }

    throw err
  }
}
export const updateReportAsync= (id: string, data: any, auth: any) => async (
  dispatch: any,
) => {
  try {
    dispatch(resetMsg())
    const response = await axios.patch(
      `${config.API_URL}/report/${id}`,
      data,
      {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      },
    )
    dispatch(SuccessMsg(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(ErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }

    throw err
  }
}

export const listReportAsync = (q?: string | null) => async (
  dispatch: any,
) => {
  try {
    dispatch(resetMsg())
    const response = await axios.get(
      [`${config.API_URL}/Report`, q ? `?name=${q}` : ''].join(''),
    )
    dispatch(setReports(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(ErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }
    throw err
  }
}
export const listMyReportAsync = (user_id: string) => async (
  dispatch: any,
) => {
  try {
    dispatch(resetMsg())
    const response = await axios.get(
      `${config.API_URL}/report/details/` + user_id,
    )
    dispatch(setMyReports(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(ErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }
    throw err
  }
}

export const {
  ErrorMsg,
  SuccessMsg,
  resetMsg,
  setMyReports,
  setReports,

} = reportSlice.actions

export default reportSlice.reducer
