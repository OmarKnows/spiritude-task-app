import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userServices from "./userService"
import { User } from "./userModel"

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    try {
      const response = await userServices.fetchUsers()
      return response
    } catch (error) {
      throw error
    }
  },
)

export const addUser = createAsyncThunk("users/addUser", async (user: User) => {
  try {
    const response = await userServices.addUser(
      user.name,
      user.email,
      user.password,
      user.role,
    )
    console.log("added")
    return response
  } catch (error) {
    throw error
  }
})

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
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.users.push(action.payload)
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
  },
})

export default userSlice.reducer
