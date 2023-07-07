import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userServices from "./userService"
import { User } from "./userModel"

interface UserState {
  users: User[]
  selectedUser?: User
  total: number
  page: number
  limit: number
  pages: number
  loading: boolean
  error?: string
}

const initialState: UserState = {
  users: [],
  total: 0,
  page: 1,
  limit: 10,
  pages: 0,
  loading: false,
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (pagination: { page: number; limit: number }) => {
    try {
      const response = await userServices.fetchUsers(
        pagination.page,
        pagination.limit,
      )
      return response
    } catch (error) {
      throw error
    }
  },
)

export const populateDropdown = createAsyncThunk(
  "users/populateDropdown",
  async (pagination: { page: number; limit: number }) => {
    try {
      const response = await userServices.fetchUsers(
        pagination.page,
        pagination.limit,
      )
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
        state.users = action.payload.data
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.pages = action.payload.pages
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(populateDropdown.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(populateDropdown.fulfilled, (state, action) => {
        const { data, ...restOfPayload } = action.payload
        console.log({
          loading: false,
          error: undefined,
          ...restOfPayload,
          users: (state.users || []).concat(data),
        })
        return {
          loading: false,
          error: undefined,
          ...restOfPayload,
          users: (state.users || []).concat(data),
        }
      })
      .addCase(populateDropdown.rejected, (state, action) => {
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
