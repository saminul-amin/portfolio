import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projects | Saminofolio",
};

// ISR
async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 text-center">My Projects</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Here are some of my recent projects showcasing my skills and experience.
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No projects found. Check back later!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}