import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/users/usersSlice"
import groupReducer from "./features/groups/groupSlice"
import authReducer from "./features/auth/authSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
