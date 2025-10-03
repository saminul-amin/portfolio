import { Metadata } from "next";

// SSG
export const metadata: Metadata = {
  title: "About Me | Saminofolio",
};

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold mb-8 text-center">About Me</h1>

        {/* Bio Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">I&apos;m Md. Saminul Amin</h2>
          <p className="text-lg text-gray-700 mb-4">
            I&apos;m a Computer Science & Engineering student and a passionate
            Full Stack Developer who loves building real-world projects that
            solve problems and enhance productivity. I enjoy exploring new
            technologies, architecting scalable systems, and creating seamless
            user experiences.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Over the past year, I have worked on diverse projects — from a{" "}
            <strong>Quiz App with timers and leaderboards</strong>, a{" "}
            <strong>Notes app with categories and tags</strong>, to a{" "}
            <strong>Freelancing platform using FastAPI & PostgreSQL</strong>. I
            also experiment with Flutter apps, Spring Boot backends, and
            full-stack MERN projects to continuously expand my skill set.
          </p>
          <p className="text-lg text-gray-700">
            I&apos;m also diving into <strong>Machine Learning</strong> to
            combine my development skills with AI. My ultimate goal is to
            contribute to impactful projects that help people and communities.
          </p>
        </section>

        {/* Contact Info */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">Email:</h3>
              <p className="text-lg">saminul.amin@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Location:</h3>
              <p className="text-lg">Dhaka, Bangladesh</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">GitHub:</h3>
              <a
                href="https://github.com/saminul-amin"
                className="text-primary hover:underline text-lg"
                target="_blank"
              >
                github.com/saminul-amin
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">LinkedIn:</h3>
              <a
                href="https://www.linkedin.com/in/md-saminul-amin-91605730a/"
                className="text-primary hover:underline text-lg"
                target="_blank"
              >
                linkedin.com/in/md-saminul-amin
              </a>
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
                <li>• ShadCN & TailwindCSS</li>
                <li>• Redux and TanStack Query</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Node.js & Express</li>
                <li>• MongoDB & Mongoose</li>
                <li>• PostgreSQL & FastAPI</li>
                <li>• FastAPI & Spring Boot</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Tools</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Git & GitHub</li>
                <li>• VS Code</li>
                <li>• Postman</li>
                <li>• Docker</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Other</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• RESTful APIs</li>
                <li>• JWT Authentication</li>
                <li>• Responsive Design</li>
                <li>• Team Collaboration</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
