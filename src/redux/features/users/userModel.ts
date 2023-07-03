import { Group } from "../groups/groupModel"

export interface User {
  _id?: string
  name: string
  email: string
  password?: string
  role: string
  totalTasks?: number
  assignedGroup?: Group
  token?: string
}
