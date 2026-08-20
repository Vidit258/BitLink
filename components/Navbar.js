"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className='bg-purple-700 text-white relative'>
      <div className='h-16 flex justify-between items-center px-4 md:px-6'>
        <Link href="/" className="logo font-bold text-lg" onClick={() => setOpen(false)}>
          BitLink
        </Link>

        {/* Desktop links */}
        <ul className='hidden md:flex justify-center gap-4 items-center'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/generate">Shorten</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li className='flex gap-3'>
            <Link href="/generate"><button className='bg-purple-500 shadow-lg p-3 rounded-lg py-1 font-bold'>Try Now</button></Link>
            <a href="https://github.com/Vidit258" target="_blank" rel="noreferrer"><button className='bg-purple-500 shadow-lg p-3 rounded-lg py-1 font-bold'>GitHub</button></a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className='md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9'
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <ul className='md:hidden flex flex-col gap-3 px-4 pb-5 pt-1'>
          <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link href="/generate" onClick={() => setOpen(false)}>Shorten</Link></li>
          <li><Link href="/contact" onClick={() => setOpen(false)}>Contact Us</Link></li>
          <li className='flex gap-3 pt-1'>
            <Link href="/generate" onClick={() => setOpen(false)}>
              <button className='bg-purple-500 shadow-lg p-3 rounded-lg py-1 font-bold'>Try Now</button>
            </Link>
            <a href="https://github.com/Vidit258" target="_blank" rel="noreferrer">
              <button className='bg-purple-500 shadow-lg p-3 rounded-lg py-1 font-bold'>GitHub</button>
            </a>
          </li>
        </ul>
      )}
    </nav>
  )
}
export default Navbar