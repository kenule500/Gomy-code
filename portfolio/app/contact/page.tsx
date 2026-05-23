import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      

      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 pt-6 sm:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Contact Me
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Feel free to reach out to me for any inquiries, collaborations, or just to say hello!
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Get In Touch
              </h2>
              <form className="mt-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Your Message"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Contact Information
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                <span className="font-medium">Email:</span> your@email.com
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                <span className="font-medium">Phone:</span> +1 (123) 456-7890
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                <span className="font-medium">Location:</span> City, Country
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  GitHub
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}