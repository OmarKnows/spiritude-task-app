import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userServices from "./userService"
import { User } from "./userModel"

interface UserState {
  users: User[]
  selectedUser?: User
  loading: boolean
  error?: string
}

const initialState: UserState = {
  users: [],
  loading: false,
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

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: string) => {
    try {
      const response = await userServices.fetchUserById(id)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const addUser = createAsyncThunk("users/addUser", async (user: User) => {
  try {
    const response = await userServices.addUser(user)
    return response
  } catch (error) {
    throw error
  }
})

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: {
    name: string
    email: string
    password: string
    role: string
    _id: string
  }) => {
    try {
      const response = await userServices.updateUser(user)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    try {
      const response = await userServices.deleteUser(id)
      return response
    } catch (error) {
      throw error
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
        state.error = undefined
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedUser = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedUser = action.payload
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedUser = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false
        state.error = undefined
        state.selectedUser = undefined
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
  },
})

export default userSlice.reducer
