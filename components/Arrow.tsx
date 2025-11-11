import React from 'react'
import Navbar from './Navbar'
import { Inter } from 'next/font/google'; // 👈 Import the font
import { ArrowRight } from 'lucide-react';


// 1. Configure the Inter font loader
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Recommended for better performance
  variable: '--font-inter', // Create a CSS variable
});

function Hero() {
  return (
    <div className="w-screen h-screen bg-[url('/bg.jpg')] bg-cover relative">
      {/* Overlay */}
      <div className="w-full h-full bg-[#533B4D] opacity-50 absolute top-0 left-0 z-0" />
      
      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>
      <div className="border-l-2 border-white h-screen absolute right-90 top-0"></div>
      <div className="border-t-2 border-white w-screen absolute right-0 bottom-60"></div>
      <div className="border-l-2 border-white h-[15rem] absolute left-90 bottom-0"></div>

      {/* Title */}
      <div className='relative z-10'><h1 className={`text-white text-[50px] pt-35 pl-10 font-semibold ${inter.variable}`}>Thoughtfull Transport</h1>
      <h1 className={`text-white text-[50px]  pl-10 font-semibold ${inter.variable}`}  > Solutions</h1>
      </div>
      
      {/* Quote */}
      <div className=" w-90 h-60 bg-[url('/qrt.jpeg')] bg-cover absolute left-0 bottom-0 flex  pl-5 pt-10 text-left">
       <div className='w-[70%]'>
       <h2 className='text-white text-2xl'>
        We make firm print profit then they have ever had in thier past term with us.
       </h2>
       <button className="text-white px-5 py-1 mt-6 rounded-full border-2 text-sm border-white flex gap-3 justify-center items-center">Learn More <ArrowRight size={16}/></button>
       </div>
       
       

      </div>
      <div className='absolute h-60  bottom-0 p-5 left-90 z-10  flex flex-col gap-5'>
      <img className='w-10 h-10' src="/right.png" alt="" />
      <img className='w-10 h-10 rotate-180' src="/right.png" alt="" />
      </div>


      
    </div>
  )
}

export default Hero
