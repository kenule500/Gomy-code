import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1">
        <section className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mx-auto grid max-w-lg items-center gap-8 text-center sm:grid-cols-2 sm:text-left">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                      Hi, I&apos;m Kenule
                </h1>
                <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-lg">
                  Passionate Full-Stack Developer | Building Modern Web Applications
                </p>
                <div className="mt-10 flex items-center justify-center gap-4 sm:justify-start">
                  <Link href="/about" className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Learn More
                  </Link>
                  <Link href="/projects" className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    View Projects
                  </Link>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="relative h-64 w-80">
                  <Image
                    src="/profile.jpg"
                    alt="Profile"
                    className="rounded-lg shadow-lg object-cover"
                    width={400}
                    height={400}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
              About Me
            </h2>
            <div className="grid max-w-2xl mx-auto grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Who I Am
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I am a dedicated software developer with expertise in building scalable and efficient web applications. My journey in technology began with a passion for problem-solving and creating meaningful digital experiences.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  What I Do
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I specialize in full-stack development, working with modern technologies like React, Next.js, Node.js, and databases to create seamless user experiences from frontend to backend.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}