import Link from "next/link";

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 pt-6 sm:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Projects
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Here are some of the projects I have worked on. Each project showcases different skills and technologies.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src="/project1.jpg" alt="Project 1" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Project One
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  A brief description of the project, highlighting the main features and technologies used.
                </p>
                <Link href="#" className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  View Project
                </Link>
              </div>
            </div>
            {/* Project Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src="/project2.jpg" alt="Project 2" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Project Two
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  A brief description of the project, highlighting the main features and technologies used.
                </p>
                <Link href="#" className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  View Project
                </Link>
              </div>
            </div>
            {/* Project Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src="/project3.jpg" alt="Project 3" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Project Three
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  A brief description of the project, highlighting the main features and technologies used.
                </p>
                <Link href="#" className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  View Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}