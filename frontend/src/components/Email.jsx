import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { IoMdArrowBack, IoMdStarOutline, IoMdStar } from "react-icons/io"
import { MdDelete, MdArchive, MdLabel, MdMoreVert } from "react-icons/md"
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
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
            <IoMdArrowBack className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdArchive className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdLabel className="w-5 h-5 text-gray-600" />
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
            <div className="w-px h-5 bg-gray-300 mx-2" />
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MdMoreVert className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-normal text-gray-900 mb-4">{email.subject}</h1>
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{email.time}</span>
              <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => toggleStarred(email.id)}>
                {email.starred ? (
                  <IoMdStar className="w-5 h-5 text-yellow-400" />
                ) : (
                  <IoMdStarOutline className="w-5 h-5 text-gray-400" />
                )}
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
          <button className="text-gray-600 text-sm">Click here to reply or forward</button>
        </div>
      </div>
    </div>
  )
}

export default Email

