import React from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import CategoryTabs from './components/CategoryTabs'
import Email from './components/Email'
import EmailList from './components/EmailList'

const Layout=()=> {
  return (
    <>
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
    {/* <Navbar/>
    <div className='flex'>
        <Sidebar/>
        <Outlet/>
    </div> */}
    </>
  );
};

export default Layout;