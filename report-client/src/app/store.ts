import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './redux/user/userSlice'
import reportReducer from './redux/report/reportSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  report: reportReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
