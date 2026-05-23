import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                My Portfolio
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-300">
                Home
              </Link>
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-300">
                About
              </Link>
              <Link href="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-300">
                Projects
              </Link>
              <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}