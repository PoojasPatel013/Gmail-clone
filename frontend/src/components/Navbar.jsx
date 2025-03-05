import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";
import { BsQuestionCircle } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="h-16 flex items-center px-2 bg-white border-b border-gray-200 justify-between">
      <div className="flex items-center gap-2 min-w-[240px]">
        <button className="p-3 hover:bg-gray-100 rounded-full">
          <RxHamburgerMenu className="text-gray-500" size={20} />
        </button>
        <div className="flex items-center gap 6">
          <img src="https://www.google.com/gmail/about/static-2.0/images/logo-gmail.png?fingerprint=c2eaf4aae389c3f885e97081bb197b97" 
               alt="Gmail" className="h-[40px]" /> Gmail 
        </div>
      </div>
      <div className='flex-1 max-w-[720px]'>
        <div className="flex items-center bg-[#eaf1fb] hover:bg-[#e3e9f3] hover:shadow-sm px-4 py-3 rounded-2xl">
          <IoMdSearch size={20} className="text-gray-600 mr-4" />
          <input
            type="text"
            placeholder='Search mail'
            className='bg-transparent w-full outline-none text-gray-700 placeholder-gray-600'
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 justify-between">
        <button className="p-3 hover:bg-gray-100 rounded-full">
          <BsQuestionCircle className="text-gray-500" size={20} />
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-full">
          <IoSettingsSharp className="text-gray-500" size={20} />
        </button>
        <button className="p-3 hover:bg-gray-100 rounded-full">
          <CgMenuGridO className="text-gray-500" size={20} />
        </button>
        <button className='h-8 w-8 rounded-full bg-green-600 text-white hover:bg-green-800 flex items-center justify-center'>
            PP
        </button>
      
      </div>
    </div>
  )
}

export default Navbar
