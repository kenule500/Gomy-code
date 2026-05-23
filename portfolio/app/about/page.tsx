

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 pt-6 sm:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            About Me
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Hello! I am a passionate software developer with experience in building web applications using modern technologies.
            I specialize in full-stack development, with a focus on creating responsive and user-friendly interfaces.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              My Skills
            </h2>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>React.js & Next.js</li>
              <li>Node.js & Express</li>
              <li>MongoDB & PostgreSQL</li>
              <li>Tailwind CSS & Styled Components</li>
              <li>RESTful APIs & GraphQL</li>
              <li>Git & GitHub</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}