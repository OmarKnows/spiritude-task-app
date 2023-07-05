import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { useEffect } from "react"
import { fetchGroups } from "../../redux/features/groups/groupSlice"
import GroupTable from "../../components/GroupTable"

const Groups = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { groups } = useAppSelector((state) => state.group)

  useEffect(() => {
    dispatch(fetchGroups())
  }, [])

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="flex justify-between m-3">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Groups
        </h1>
        <button
          onClick={() => navigate("create-group")}
          className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Add Group
        </button>
      </div>
      <div className="mx-3">
        <GroupTable groups={groups} />
      </div>
    </div>
  )
}

export default Groups
