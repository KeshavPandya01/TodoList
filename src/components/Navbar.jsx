import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-cyan-950 text-white px-3 py-3'>
        <div className="logo">
         <span className='font-bold'>iTask</span>
        </div>
        <ul className='flex gap-3'>
            <li className='cursor-pointer py-1 px-2 rounded-md hover:font-semibold'>Home</li>
            <li className='cursor-pointer py-1 px-2 rounded-md hover:font-semibold'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
