import React from "react"
import tasks from "../assets/tasks.jpg"
import { useNavigate } from "react-router-dom"

interface Props {
  imgsrc?: string
  title?: string | number
  text?: string
}

const Card: React.FC<Props> = ({ imgsrc, text, title }) => {
  const navigate = useNavigate()
  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-10 mt-4">
      <img className="rounded-t-lg" src={imgsrc} alt="" />
      <div className="p-5 flex justify-between">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {text}
        </p>

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </div>
    </div>
  )
}

export default Card
