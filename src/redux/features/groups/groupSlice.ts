import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Group } from "./groupModel"
import groupServices from "./groupService"

interface GroupState {
  groups: Group[]
  selectedGroup?: Group
  total: number
  page: number
  limit: number
  pages: number
  loading: boolean
  error?: string
}

const initialState: GroupState = {
  groups: [],
  total: 0,
  page: 1,
  limit: 10,
  pages: 0,
  loading: false,
}

export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async (pagination: { page: number; limit: number }) => {
    try {
      const response = await groupServices.fetchGroups(
        pagination.page,
        pagination.limit,
      )
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
    users?: string[]
    name: string
    description: string
  }) => {
    const { users, name, description } = groupData
    try {
      const response = await groupServices.addGroup(name, description, users)
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
    users?: string[]
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

const groupSlice = createSlice({
  name: "groups",
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
        state.groups = action.payload.data
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.pages = action.payload.pages
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

export default groupSlice.reducer
