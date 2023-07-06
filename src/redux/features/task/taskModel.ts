import { User } from "../users/userModel"

export interface Task {
  _id?: string
  details: string
  status: "TODO" | "IN_PROGRESS" | "DONE" | "PENDING_DELETE"
  dueDate: string
  isTaskPastDue: true
  user: User
  createdBy: User
}
