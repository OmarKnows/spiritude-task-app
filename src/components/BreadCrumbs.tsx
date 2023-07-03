import { Link, useLocation } from "react-router-dom"

const BreadCrumbs = () => {
  const location = useLocation()
  let currentLink = ""

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      if (crumb.length !== 24) currentLink += `/${crumb}`
      else crumb = "user details"

      return (
        <div className="mx-1" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      )
    })

  return <div className="w-[85vw] ml-[15vw] flex">{crumbs}</div>
}

export default BreadCrumbs
