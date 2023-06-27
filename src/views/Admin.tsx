import ModuleTable from "../components/ModuleTable"

const Admin = () => {
  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="flex justify-center">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Admins
        </h1>
      </div>
      <div className="mx-3">
        <ModuleTable />
      </div>
    </div>
  )
}

export default Admin
