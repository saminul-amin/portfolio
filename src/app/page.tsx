import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Saminofolio"
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Full Stack Developer | Problem Solver | Tech Enthusiast
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/projects"
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/blogs"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Read Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Express",
              "MongoDB",
              "Tailwind CSS",
              "Git",
            ].map((skill) => (
              <div
                key={skill}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-lg">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects and opportunities.
          </p>
          <Link
            href="/about"
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
