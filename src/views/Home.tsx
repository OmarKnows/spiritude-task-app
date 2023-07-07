import { useEffect } from "react"
import { useAppSelector } from "../redux/hook"
import Card from "../components/Card"
import task from "../assets/tasks.jpg"
import teams from "../assets/teams.jpeg"
import permissions from "../assets/permissions.jpeg"

const Home = () => {
  const { userData } = useAppSelector((state) => state.auth)

  useEffect(() => {
    console.log(userData)
  }, [])
  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="flex justify-between px-4 py-5 sm:px-6">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Home
        </h1>
        <p className="text-xl">Welcome Back {userData?.name}!</p>
      </div>
      <hr className="mb-4" />
      <div className="flex justify-between">
        <Card
          imgsrc={task}
          text="Your Assigned Tasks"
          title={userData?.totalTasks}
        />
        {/* <Card imgsrc={teams} text="Your Assigned Group" title="6" /> */}
        <Card
          imgsrc={permissions}
          text="Your Permissions"
          title={userData?.role}
        />
      </div>
    </div>
  )
}

export default Home
