import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdRefresh, MdMoreVert, MdDelete, MdArchive } from "react-icons/md"
import { IoMdCheckboxOutline, IoMdCheckbox, IoMdStarOutline, IoMdStar } from "react-icons/io"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useEmail } from "../context/EmailContext"

const EmailList = () => {
  const {
    emails,
    selectedEmails,
    currentCategory,
    toggleEmailSelection,
    toggleStarred,
    markAsRead,
    deleteEmails,
    selectAllEmails,
    deselectAllEmails,
  } = useEmail()

  const navigate = useNavigate()
  const [hoveredEmail, setHoveredEmail] = useState(null)

  const visibleEmails = emails.filter((email) => email.category === currentCategory)
  const allSelected = visibleEmails.length > 0 && visibleEmails.every((email) => selectedEmails.has(email.id))

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAllEmails()
    } else {
      selectAllEmails()
    }
  }

  const handleDelete = () => {
    deleteEmails(Array.from(selectedEmails))
  }

  const handleMarkAsRead = () => {
    markAsRead(Array.from(selectedEmails))
  }

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleSelectAll}>
              {allSelected ? (
                <IoMdCheckbox className="text-gray-600" size={20} />
              ) : (
                <IoMdCheckboxOutline className="text-gray-600" size={20} />
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdRefresh className="text-gray-600" size={20} />
            </button>
            {selectedEmails.size > 0 ? (
              <>
                <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleDelete}>
                  <MdDelete className="text-gray-600" size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleMarkAsRead}>
                  <MdArchive className="text-gray-600" size={20} />
                </button>
              </>
            ) : (
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MdMoreVert className="text-gray-600" size={20} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              1-{visibleEmails.length} of {visibleEmails.length}
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaChevronLeft size={12} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
      <div>
        {visibleEmails.map((email) => (
          <Link
            to={`/email/${email.id}`}
            key={email.id}
            className={`flex items-center px-4 py-2 border-b hover:shadow-md cursor-pointer
              ${hoveredEmail === email.id ? "bg-[#f2f6fc]" : "bg-white"}
              ${selectedEmails.has(email.id) ? "bg-[#c2e7ff]" : ""}`}
            onMouseEnter={() => setHoveredEmail(email.id)}
            onMouseLeave={() => setHoveredEmail(null)}
            onClick={(e) => {
              e.preventDefault();
              markAsRead([email.id]);
              navigate(`/email/${email.id}`);
            }}
          >
            <div className="flex items-center gap-4 min-w-[240px]">
              <button
                className="p-2 hover:bg-gray-200 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleEmailSelection(email.id)
                }}
              >
                {selectedEmails.has(email.id) ? (
                  <IoMdCheckbox className="text-gray-600" size={20} />
                ) : (
                  <IoMdCheckboxOutline className="text-gray-400" size={20} />
                )}
              </button>
              <button
                className="p-2 hover:bg-gray-200 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleStarred(email.id)
                }}
              >
                {email.starred ? (
                  <IoMdStar className="text-yellow-400" size={20} />
                ) : (
                  <IoMdStarOutline className="text-gray-400" size={20} />
                )}
              </button>
              <span className={`${email.read ? "text-gray-600" : "font-medium"}`}>{email.sender}</span>
            </div>
            <div className="flex-1 flex items-center">
              <span className={`${email.read ? "text-gray-600" : "font-medium"}`}>{email.subject}</span>
              <span className="mx-2 text-gray-500">-</span>
              <span className="text-gray-500 truncate">{email.preview}</span>
            </div>
            <div className="ml-4 text-sm text-gray-600">{email.time}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default EmailList





