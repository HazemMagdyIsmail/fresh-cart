import { Link } from 'lucide-react'
import React from 'react'

export default function notfound() {
 return (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <img
      src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
      alt="404 not found"
      className="w-72 md:w-96 mb-6 rounded-2xl shadow-lg"
    />

    <h1 className="text-4xl font-bold mb-2">404</h1>
    <p className="text-gray-500 mb-6">
      Oops! The page you’re looking for doesn’t exist.
    </p>

    <Link
      href="/"
      className="px-6 py-3 rounded-xl bg-black text-white hover:opacity-80 transition"
    >
      Go Home
    </Link>
  </div>
)

}
