import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import EmailList from "./components/EmailList"
import Email from "./components/Email"
import CategoryTabs from "./components/CategoryTabs"
import { EmailProvider } from "./context/EmailContext"

function App() {
  return (
    <Router>
      <EmailProvider>
        <div className="flex flex-col h-screen bg-[#f6f8fc]">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <CategoryTabs />
              <Routes>
                <Route path="/" element={<EmailList />} />
                <Route path="/email/:id" element={<Email />} />
              </Routes>
            </div>
          </div>
        </div>
      </EmailProvider>
    </Router>
  )
}

export default App

