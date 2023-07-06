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
  "groups/fetchGroups",
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
  "groups/fetchGroupById",
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
  "groups/addGroup",
  async (groupData: {
    users: string[] | undefined
    name: string
    description: string
  }) => {
    const { users, name, description } = groupData
    try {
      const response = await groupServices.addGroup(users, name, description)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const updateGroup = createAsyncThunk(
  "groups/updateGroup",
  async (groupData: {
    name: string
    description: string
    users: any[] | undefined
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
  "groups/deleteUser",
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
        state.error = action.error.message ?? "Failed to fetch group data"
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
        state.error = action.error.message ?? "Failed to fetch group data"
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
        state.error = action.error.message ?? "Failed to fetch group data"
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
        state.error = action.error.message ?? "Failed to fetch group data"
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
        state.error = action.error.message ?? "Failed to fetch group data"
      })
  },
})

export default userSlice.reducer
