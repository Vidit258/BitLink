import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-lg">BitLink</span>
          <p className="text-purple-200 max-w-xs text-sm">
            A straightforward URL shortener. No tracking, no sign-up, just short links.
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <span className="font-bold uppercase text-purple-300 text-xs tracking-wide">Navigate</span>
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/generate" className="hover:underline">Shorten a link</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
        </div>
<div className="flex flex-col gap-1 text-sm">

          <span className="font-bold uppercase text-purple-300 text-xs tracking-wide">Contact</span>
          <a href="mailto:vidit9352@gmail.com" className="hover:underline">
            vidit9352@gmail.com
          </a>
          <a href="tel:+918470827227" className="hover:underline">
            +918470827227
           </a>
          <span className="hover:underline"> Prayagraj, Uttar Pradesh, India</span> 
         
        </div>
      </div>

      <div className="border-t border-purple-500 text-center text-purple-200 text-xs py-3">
        © {new Date().getFullYear()} BitLink. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer