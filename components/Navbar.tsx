import React from 'react'
import './Navbar.css' // 👈 Import the CSS for the hover animation

function Navbar() {
  return (
    <div className="w-screen h-[5rem] flex justify-between items-center px-30 gap-30 border-b-2 border-zinc-400">
      <h1 className="text-white text-3xl font-extrabold">ASIJA</h1>

      <div className="text-white text-md flex gap-18">
        <button className="h-[5.1rem] nav-link ">ABOUT US</button>
        <button className="h-[5.1rem] nav-link  ">OUR TEAM</button>
        <button className="h-[5.1rem] nav-link  ">CAREERS</button>
        <button className="h-[5.1rem] nav-link ">ARTICLES</button>
        <button className="h-[5.1rem] nav-link  ">TESTIMONY</button>
      </div>

      <div className="text-md w-[15rem] h-full flex gap-5 text-white items-center px-20">
        <button>CONTACT</button>
        <img className="w-6 h-6" src="/inst.png" alt="" />
        <img className="w-6 h-6" src="/link.png" alt="" />
      </div>
    </div>
  )
}

export default Navbar
