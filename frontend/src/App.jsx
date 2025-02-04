// import Navbar from "./components/Navbar"
// import Sidebar from "./components/Sidebar"
// import EmailList from "./components/EmailList"

// const App=()=> {
//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar />
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar />
//         <EmailList />
//       </div>
//     </div>
//   )
// }

// export default App


import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import EmailList from "./components/EmailList"
import CategoryTabs from "./components/CategoryTabs"
import { EmailProvider } from "./context/EmailContext"

function App() {
  return (
    <EmailProvider>
      <div className="flex flex-col h-screen bg-[#f6f8fc]">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <CategoryTabs />
            <EmailList />
          </div>
        </div>
      </div>
    </EmailProvider>
  )
}

export default App


