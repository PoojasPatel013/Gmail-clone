import { useEmail } from "../context/EmailContext"
import { MdInbox, MdPeople, MdLocalOffer } from "react-icons/md"

const categories = [
  { id: "primary", label: "Primary", icon: MdInbox },
  { id: "social", label: "Social", icon: MdPeople },
  { id: "promotions", label: "Promotions", icon: MdLocalOffer },
]

const CategoryTabs = () => {
  const { currentCategory, setCategory, emails } = useEmail()

  const getCategoryCount = (category) => {
    return emails.filter((email) => email.category === category && !email.read).length
  }

  return (
    <div className="flex border-b">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setCategory(id)}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
            ${
              currentCategory === id
                ? "text-blue-600 border-blue-600 bg-[#e8f0fe]"
                : "text-gray-600 border-transparent hover:bg-gray-100"
            }`}
        >
          <Icon size={20} />
          {label}
          {getCategoryCount(id) > 0 && <span className="ml-1 text-xs">({getCategoryCount(id)})</span>}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs

