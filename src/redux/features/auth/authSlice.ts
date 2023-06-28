import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LoginCredentials } from "./authModel"
import { User } from "../users/userModel"
import authServices from "./authServices"

const userDataString = localStorage.getItem("userData")
const userData: User | null = userDataString ? JSON.parse(userDataString) : null

interface AuthState {
  userData: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  userData,
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    try {
      const response = await authServices.login(
        credentials.email,
        credentials.password,
      )
      return response
    } catch (error) {
      throw error
    }
  },
)

export const logout = createAsyncThunk("auth/logout", async () => {
  authServices.logout()
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = "Unexpected error" //change this later
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null
        state.loading = false
        state.error = null
      })
  },
})

export default authSlice.reducer
