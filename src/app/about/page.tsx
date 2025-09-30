// SSG - Static Site Generation
export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold mb-8 text-center">About Me</h1>

        {/* Bio Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Hello! I'm [Your Name]</h2>
          <p className="text-lg text-gray-700 mb-4">
            I'm a passionate Full Stack Developer with expertise in building
            modern web applications using the latest technologies. I love
            solving complex problems and creating seamless user experiences.
          </p>
          <p className="text-lg text-gray-700">
            With a strong foundation in both frontend and backend development, I
            specialize in creating scalable, maintainable, and user-friendly
            applications.
          </p>
        </section>

        {/* Contact Info */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">Email:</h3>
              <p className="text-lg">your.email@example.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Location:</h3>
              <p className="text-lg">Your City, Country</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">GitHub:</h3>
              <a
                href="https://github.com/yourusername"
                className="text-primary hover:underline text-lg"
              >
                github.com/yourusername
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">LinkedIn:</h3>
              <a
                href="https://linkedin.com/in/yourusername"
                className="text-primary hover:underline text-lg"
              >
                linkedin.com/in/yourusername
              </a>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold">Full Stack Developer</h3>
              <p className="text-gray-600">Company Name | 2022 - Present</p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li>
                  • Developed and maintained web applications using Next.js and
                  React
                </li>
                <li>• Built RESTful APIs with Node.js and Express</li>
                <li>
                  • Collaborated with cross-functional teams to deliver projects
                </li>
              </ul>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold">Junior Developer</h3>
              <p className="text-gray-600">Another Company | 2020 - 2022</p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li>
                  • Assisted in frontend development using React and TypeScript
                </li>
                <li>
                  • Participated in code reviews and agile development processes
                </li>
                <li>
                  • Learned and implemented best practices in software
                  development
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• React & Next.js</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• HTML5 & CSS3</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Node.js & Express</li>
                <li>• MongoDB & Mongoose</li>
                <li>• PostgreSQL & Prisma</li>
                <li>• RESTful APIs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Tools</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Git & GitHub</li>
                <li>• Docker</li>
                <li>• VS Code</li>
                <li>• Postman</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Other</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• JWT Authentication</li>
                <li>• Responsive Design</li>
                <li>• API Integration</li>
                <li>• Agile/Scrum</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
