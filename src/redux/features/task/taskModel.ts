import { User } from "../users/userModel"

export interface Task {
  _id?: string
  details: string
  status: string
  dueDate: string
  isTaskPastDue: true
  user: User
  createdBy: User
}
