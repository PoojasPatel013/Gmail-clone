import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { IoMdArrowBack, IoMdStarOutline, IoMdStar } from "react-icons/io"
import {
  MdDelete,
  MdArchive,
  MdLabel,
  MdMoreVert,
  MdOutlineEmail,
  MdAccessTime,
  MdPrint,
  MdOpenInNew,
  MdArrowBack,
  MdArrowForward,
  MdReply,
} from "react-icons/md"
import { useEmail } from "../context/EmailContext"

const Email = () => {
  const { id } = useParams()
  const [email, setEmail] = useState(null)
  const { toggleStarred, deleteEmails } = useEmail()

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/emails/${id}`)
        const data = await response.json()
        setEmail(data)
      } catch (error) {
        console.error("Error fetching email:", error)
      }
    }

    fetchEmail()
  }, [id])

  if (!email) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex-1 h-screen bg-white">
      {/* Top Action Bar */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-gray-800">
              <IoMdArrowBack className="w-5 h-5" />
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdArchive className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdAccessTime className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => {
                deleteEmails([email.id])
                window.history.back()
              }}
            >
              <MdDelete className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdOutlineEmail className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdLabel className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdMoreVert className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <span>1 of 27</span>
              <button className="p-2 hover:bg-gray-100 rounded-full ml-2">
                <MdArrowBack className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MdArrowForward className="w-5 h-5" />
              </button>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdPrint className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdOpenInNew className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-normal text-gray-900">{email.subject}</h1>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-xs px-2 py-1 rounded">Inbox</span>
              <span className="text-sm text-gray-500">×</span>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                {email.sender?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{email.sender}</span>
                  <span className="text-sm text-gray-500">{`<${email.senderEmail || "email@example.com"}>`}</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span>to me</span>
                  <button className="hover:bg-gray-100 rounded p-1">
                    <MdMoreVert className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{email.time}</span>
              <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => toggleStarred(email.id)}>
                {email.starred ? (
                  <IoMdStar className="w-5 h-5 text-yellow-400" />
                ) : (
                  <IoMdStarOutline className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MdReply className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MdMoreVert className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-800">{email.body}</div>
        </div>

        {/* Reply Section */}
        <div className="mt-8 border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-gray-600">
            <MdReply className="w-5 h-5" />
            <span className="text-sm">Click here to reply or forward</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Email

