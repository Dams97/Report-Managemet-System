import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import config from '../../config'

const initialState: {
  auth: Record<string, string> | undefined
  user: Record<string, string> | undefined
  ErrorMessage: string
} = {
  auth: undefined,
  user: undefined,
  ErrorMessage: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginErrorMsg: (state, action: PayloadAction<string>) => {
      state.ErrorMessage = action.payload
    },

    setAuth: (state, action: PayloadAction<any>) => {
      state.auth = action.payload
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
  },
})

export const loginUserAsync = (data: any) => async (dispatch: any) => {
  try {
    dispatch(loginErrorMsg(''))
    const response = await axios.post(`${config.API_URL}/login`, data)
    dispatch(setAuth(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(loginErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }

    throw err
  }
}
export const logoutUserAsync = () => async (dispatch: any) => {
  try {
    dispatch(loginErrorMsg(''))
  
    dispatch(setAuth(null))
    dispatch(setUser(null))
  } catch (err) {
    if (err instanceof AxiosError) {
     
      throw new Error(err.message)
    }

    throw err
  }
}
export const updateUserAsync = (id: any,  data:any, auth:any) => async (dispatch: any) => {
  try {
    dispatch(loginErrorMsg(''))
    const response = await axios.put(`${config.API_URL}/user`, data,   
    {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    },)
    dispatch(setUser(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(loginErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }

    throw err
  }
}
export const registerUserAsync = (data: any) => async (dispatch: any) => {
  try {
    dispatch(loginErrorMsg(''))
    const response = await axios.post(`${config.API_URL}/signup`, data)
    dispatch(setAuth(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(loginErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }

    throw err
  }
}
export const profileUserAsync = (auth: any) => async (dispatch: any) => {
  try {
    dispatch(loginErrorMsg(''))
    const response = await axios.get(`${config.API_URL}/me`, {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })

    dispatch(setUser(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(loginErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }
    throw err
  }
  
}
export const listUserAsync = (q?: string | null) => async (dispatch: any) => {
  try {
    dispatch(loginErrorMsg(''))
    const response = await axios.get([`${config.API_URL}/user`, q ? `?name=${q}` : ''].join(''), 
   
    )
    dispatch(setUser(response.data))
  } catch (err) {
    if (err instanceof AxiosError) {
      dispatch(loginErrorMsg(err.response?.data?.message))
      throw new Error(err.message)
    }
    throw err
  }
  
}

export const { setUser, setAuth, loginErrorMsg } = userSlice.actions
export const getAuth = (state: any) => state.user.auth
export const getUser = (state: any) => state.user.user
export default userSlice.reducer
