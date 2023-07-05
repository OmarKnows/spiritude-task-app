import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Group } from "./groupModel"
import groupServices from "./groupService"
import { User } from "../users/userModel"

interface GroupState {
  groups: Group[]
  selectedGroup?: Group
  loading: boolean
  error?: string
}

const initialState: GroupState = {
  groups: [],
  loading: false,
}

export const fetchGroups = createAsyncThunk<Group[]>(
  "users/fetchGroups",
  async () => {
    try {
      const response = await groupServices.fetchGroups()
      return response
    } catch (error) {
      throw error
    }
  },
)

export const fetchGroupById = createAsyncThunk(
  "users/fetchGroupById",
  async (id: string) => {
    try {
      const response = await groupServices.fetchGroupById(id)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const addGroup = createAsyncThunk(
  "users/addGroup",
  async (groupData: { group: Group; users: User[] }) => {
    const { group, users } = groupData
    try {
      const response = await groupServices.addGroup(group, users)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const updateGroup = createAsyncThunk(
  "users/updateGroup",
  async (groupData: {
    name: string
    description: string
    users: User[]
    _id: string
  }) => {
    try {
      const response = await groupServices.updateGroup(groupData)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const deleteGroup = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    try {
      const response = await groupServices.deleteGroup(id)
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
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.groups = action.payload
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(fetchGroupById.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedGroup = action.payload
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(addGroup.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedGroup = action.payload
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(updateGroup.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedGroup = action.payload
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.loading = false
        state.error = undefined
        state.selectedGroup = undefined
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch user data"
      })
  },
})

export default userSlice.reducer
