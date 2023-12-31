import React from "react"

interface Props {
  status?: "TODO" | "IN_PROGRESS" | "DONE" | "PENDING_DELETE"
}

const renderStatus = (
  status?: "TODO" | "IN_PROGRESS" | "DONE" | "PENDING_DELETE",
) => {
  switch (status) {
    case "TODO":
      return (
        <div className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 py-2.5 rounded-lg dark:bg-yellow-900 dark:text-yellow-300 text-center w-[50%] font-black">
          TODO
        </div>
      )
    case "IN_PROGRESS":
      return (
        <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-1.5 py-2.5 rounded-lg dark:bg-blue-900 dark:text-blue-300 text-center w-[50%] font-black">
          IN PROGRESS
        </div>
      )
    case "DONE":
      return (
        <div className="bg-green-100 text-green-800 text-xs font-medium mr-2 py-2.5 rounded-lg dark:bg-green-900 dark:text-green-300 text-center w-[50%] font-black">
          DONE
        </div>
      )
    case "PENDING_DELETE":
      return (
        <div className="bg-red-100 text-red-800 text-xs font-medium mr-2 py-2.5 rounded-lg dark:bg-red-900 dark:text-red-300 text-center w-[50%] font-black">
          PENDING DELETION
        </div>
      )
    default:
      return <div>N/A</div>
  }
}

const StatusPill: React.FC<Props> = ({ status }) => {
  return renderStatus(status)
}

export default StatusPill
