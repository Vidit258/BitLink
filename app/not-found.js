import Link from "next/link"

export default function NotFound() {
  return (
    <main className="bg-purple-100 min-h-[80vh] flex items-center justify-center">
      <div className="text-center flex flex-col gap-4 items-center px-6">
        <h1 className="text-3xl font-bold">404 - Page not found</h1>
        <p className="text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <button className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold text-white">
            Go home
          </button>
        </Link>
      </div>
    </main>
  )
}
