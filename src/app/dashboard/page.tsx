"use client";

import { useEffect, useState } from "react";
import { getAuth } from "@/lib/auth";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
  });
  const [loading, setLoading] = useState(true);
  const user = getAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsRes, projectsRes] = await Promise.all([
        api.get("/blogs"),
        api.get("/projects"),
      ]);

      setStats({
        blogs: blogsRes.data.count || 0,
        projects: projectsRes.data.count || 0,
      });
    } catch (error) {
      toast.error("Failed to fetch statistics");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}!</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Total Blogs
          </h3>
          <p className="text-4xl font-bold text-primary">{stats.blogs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Total Projects
          </h3>
          <p className="text-4xl font-bold text-primary">{stats.projects}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Role</h3>
          <p className="text-4xl font-bold text-green-600 capitalize">
            {user?.role}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="/dashboard/blogs/create"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center"
          >
            <p className="font-semibold text-lg">Create New Blog</p>
            <p className="text-gray-600 text-sm">
              Write and publish a new blog post
            </p>
          </a>
          <a
            href="/dashboard/blogs"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center"
          >
            <p className="font-semibold text-lg">Manage Blogs</p>
            <p className="text-gray-600 text-sm">
              Edit or delete existing blogs
            </p>
          </a>

          <a
            href="/dashboard/projects/create"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center"
          >
            <p className="font-semibold text-lg">Create New Project</p>
            <p className="text-gray-600 text-sm">Add Project</p>
          </a>
          <a
            href="/dashboard/projects"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center"
          >
            <p className="font-semibold text-lg">Manage Projects</p>
            <p className="text-gray-600 text-sm">
              Edit or delete existing projects
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
