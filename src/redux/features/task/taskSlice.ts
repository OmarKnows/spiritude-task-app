import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Task } from "./taskModel"
import taskServices from "./taskService"
import { User } from "../users/userModel"

interface taskState {
  tasks: Task[]
  selectedTask?: Task
  tasksPastDue: boolean
  loading: boolean
  error?: string
}

const initialState: taskState = {
  tasks: [],
  tasksPastDue: false,
  loading: false,
}

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    try {
      const response = await taskServices.fetchTasks()
      return response
    } catch (error) {
      throw error
    }
  },
)

export const fetchTasksById = createAsyncThunk(
  "tasks/fetchTasksById",
  async (id: string) => {
    try {
      const response = await taskServices.fetchTasksById(id)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const addTask = createAsyncThunk(
  "tasks/addTasks",
  async (taskData: {
    user: string
    dueDate: string | undefined
    details: string
  }) => {
    const { user, dueDate, details } = taskData
    try {
      const response = await taskServices.addTask(user, dueDate, details)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: {
    status: "TODO" | "IN_PROGRESS" | "DONE" | "PENDING_DELETE" | undefined
    details: string
    dueDate: string | undefined
    user: string
    _id: string
  }) => {
    try {
      const response = await taskServices.updateTask(task)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    try {
      const response = await taskServices.deleteTask(id)
      return response
    } catch (error) {
      throw error
    }
  },
)

export const areTasksPastDue = createAsyncThunk(
  "tasks/areTasksPastDue",
  async () => {
    try {
      const response = await taskServices.areTasksPastDue()
      return response
    } catch (error) {
      throw error
    }
  },
)

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch task data"
      })
      .addCase(fetchTasksById.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchTasksById.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedTask = action.payload
      })
      .addCase(fetchTasksById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch task data"
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedTask = action.payload
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch task data"
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.selectedTask = action.payload
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch task data"
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false
        state.error = undefined
        state.selectedTask = undefined
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch task data"
      })
      .addCase(areTasksPastDue.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(areTasksPastDue.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.tasksPastDue = action.payload
      })
      .addCase(areTasksPastDue.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch task data"
      })
  },
})

export default taskSlice.reducer
