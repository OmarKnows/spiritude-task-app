import { User } from "../users/userModel"

export interface Group {
  _id?: string
  name: string
  description: string
  createdBy?: User
  totalUsers?: number
  users?: User[]
}
