import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "./userModel"
import axios from "axios"

interface UserState {
  userData: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  userData: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue("Failed to fetch user data.")
    }
  },
)

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.userData = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
  },
})

export default userSlice.reducer
