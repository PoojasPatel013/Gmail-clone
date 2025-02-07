import { CgArrowsExpandRight } from "react-icons/cg"
import { RxCross2 } from "react-icons/rx"
import { AiOutlineFontColors } from "react-icons/ai"
import { IoMdAttach } from "react-icons/io"
import { IoMdLink } from "react-icons/io"
import { MdOutlineEmojiEmotions } from "react-icons/md"
import { FaGoogleDrive } from "react-icons/fa"
import { MdOutlineInsertPhoto } from "react-icons/md"
import { MdOutlineLockClock } from "react-icons/md"
import { FaPenAlt } from "react-icons/fa"
import { BsThreeDotsVertical } from "react-icons/bs"

const NewMessage = ({ onClose }) => {
  return (
    <div className="flex flex-col absolute bottom-0 right-20 w-[500px] h-[500px] bg-white shadow-xl rounded-t-lg">
      <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t-lg">
        <span className="font-semibold">New Message</span>
        <div className="flex items-center gap-2">
          <CgArrowsExpandRight className="cursor-pointer" />
          <RxCross2 className="cursor-pointer" onClick={onClose} />
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <input className="border-b mb-2 p-2 outline-none" placeholder="To" />
        <input className="border-b mb-2 p-2 outline-none" placeholder="Subject" />
        <textarea className="flex-1 outline-none resize-none" placeholder="Compose your email here..." />
      </div>
      <div className="flex items-center justify-between p-2 border-t">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Send</button>
        <div className="flex items-center gap-2">
          <AiOutlineFontColors className="cursor-pointer" />
          <IoMdAttach className="cursor-pointer" />
          <IoMdLink className="cursor-pointer" />
          <MdOutlineEmojiEmotions className="cursor-pointer" />
          <FaGoogleDrive className="cursor-pointer" />
          <MdOutlineInsertPhoto className="cursor-pointer" />
          <MdOutlineLockClock className="cursor-pointer" />
          <FaPenAlt className="cursor-pointer" />
          <BsThreeDotsVertical className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default NewMessage

