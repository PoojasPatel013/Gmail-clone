import React, { useState } from 'react'
import { LuPencil } from "react-icons/lu"
import { MdInbox } from "react-icons/md"
import { IoMdStarOutline } from "react-icons/io"
import { IoMdTime } from "react-icons/io"
import { CiPaperplane } from "react-icons/ci"
import { RiDraftLine } from "react-icons/ri"
import { IoIosArrowDown } from "react-icons/io"
import NewMessage from './NewMessage'

const sidebarItems = [
  {
    icon: <MdInbox size={20} />,
    text: "Inbox",
    count: 12,
    active: true,
  },
  {
    icon: <IoMdStarOutline size={20} />,
    text: "Starred",
  },
  {
    icon: <IoMdTime size={20} />,
    text: "Snoozed",
  },
  {
    icon: <CiPaperplane size={20} />,
    text: "Sent",
  },
  {
    icon: <RiDraftLine size={20} />,
    text: "Draft",
    count: 3,
  },
  {
    icon: <IoIosArrowDown size={20} />,
    text: "More",
  },
]

const Sidebar = () => {
  const [showNewMessage, setShowNewMessage] = useState(false)

  const handleComposeClick = () => {
    setShowNewMessage(true)
  }

  return (
    <div className="w-64 h-full bg-white pt-2 flex flex-col">
      <div className="px-4 mb-2">
        <button
          onClick={handleComposeClick}
          className="flex items-center gap-4 bg-[#c2e7ff] hover:bg-[#b4deff] hover:shadow-md transition-all px-6 py-4 rounded-2xl w-full"
        >
          <LuPencil size={18} />
          <span className="font-medium">Compose</span>
        </button>
      </div>
      <div className="flex-1">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-6 py-[6px] mr-2 rounded-r-full gap-4 cursor-pointer
              ${item.active ? "bg-[#d3e3fd]" : "hover:bg-[#eaebef]"}`}
          >
            <div className="text-gray-600">{item.icon}</div>
            <span className="flex-1">{item.text}</span>
            {item.count && <span className="text-sm font-medium">{item.count}</span>}
          </div>
        ))}
      </div>
      {showNewMessage && <NewMessage onClose={() => setShowNewMessage(false)} />}
    </div>
  )
}

export default Sidebar


