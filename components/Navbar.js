import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-16 bg-purple-700 flex justify-between items-center px-3 items center text-white'>
      <div className="logo font-bold text-lg">
        BitLink
      </div>
      <ul className='flex justify-center gap-4 items-center'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/generate">Shorten</Link></li>
        <li><Link href="/contact">Contact Us</Link></li>
        <li className='flex gap-3'>
          <Link href="/generate"><button className='bg-purple-500 shadow-lg p-3 rounded-lg py-1 font-bold'>Try Now</button></Link>
          <a href="https://github.com/Vidit258" target="_blank" rel="noreferrer"><button className='bg-purple-500 shadow-lg p-3 rounded-lg py-1 font-bold'>GitHub</button></a>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
