import { useNavigate } from "react-router-dom"

interface Props {
  message: string
  color: "green" | "red" | "orange"
  redirect: string
}

const Message: React.FC<Props> = ({ message, redirect, color }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 mx-4 flex justify-between`}
    >
      <div>
        <p className="font-bold">{color === "green" ? "Success" : "Error"}</p>
        <p>{message}</p>
      </div>
      <button
        className={`bg-transparent hover:bg-${color}-500 text-${color}-700 font-semibold hover:text-white py-2 px-4 border border-${color}-500 hover:border-transparent rounded`}
        onClick={() => navigate(redirect)}
      >
        Back
      </button>
    </div>
  )
}

export default Message
