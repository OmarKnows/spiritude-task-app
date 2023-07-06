import React, { useState } from "react"

const DueBanner = () => {
  const [showBanner, setShowBanner] = useState<boolean>(true)
  const closeBanner = () => {
    setShowBanner(false)
  }
  return (
    <div>
      {showBanner ? (
        <div className="flex justify-between overflow-hidden bg-orange-600 w-[85vw] ml-[15vw] py-3">
          <div></div>
          <div className="flex items-center ml-2">
            <p className="text-md text-gray-900">You have tasks past due!</p>
          </div>
          <button
            type="button"
            className="bg-orange-600 rounded-md p-2 inline-flex items-center justify-center hover:text-gray-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-700 mr-2"
            onClick={closeBanner}
          >
            <span className="sr-only">Close menu</span>

            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default DueBanner
