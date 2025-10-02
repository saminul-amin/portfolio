"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface ProjectFormData {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  liveLink?: string;
  features: string;
  technologies: string;
}

export default function CreateProject() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>();

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const featuresArray = data.features
        ? data.features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const technologiesArray = data.technologies
        ? data.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const response = await api.post("/projects", {
        ...data,
        features: featuresArray,
        technologies: technologiesArray,
      });

      if (response.data.success) {
        toast.success("Project created successfully!");
        router.push("/dashboard/projects");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to create project";
      toast.error(message);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Create New Project</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Project Title *
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title must be less than 100 characters",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description *
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 1000,
                message: "Description must be less than 1000 characters",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Describe your project"
            rows={5}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="thumbnail"
            className="block text-gray-700 font-semibold mb-2"
          >
            Thumbnail URL *
          </label>
          <input
            type="url"
            id="thumbnail"
            {...register("thumbnail", {
              required: "Thumbnail URL is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="https://example.com/image.jpg"
          />
          {errors.thumbnail && (
            <p className="text-red-600 text-sm mt-1">
              {errors.thumbnail.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="link"
            className="block text-gray-700 font-semibold mb-2"
          >
            GitHub Link *
          </label>
          <input
            type="url"
            id="link"
            {...register("link", {
              required: "GitHub link is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="https://github.com/username/repo"
          />
          {errors.link && (
            <p className="text-red-600 text-sm mt-1">{errors.link.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="liveLink"
            className="block text-gray-700 font-semibold mb-2"
          >
            Live Demo Link (Optional)
          </label>
          <input
            type="url"
            id="liveLink"
            {...register("liveLink", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="https://your-project.com"
          />
          {errors.liveLink && (
            <p className="text-red-600 text-sm mt-1">
              {errors.liveLink.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="features"
            className="block text-gray-700 font-semibold mb-2"
          >
            Features
          </label>
          <textarea
            id="features"
            {...register("features")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Feature 1, Feature 2, Feature 3 (comma separated)"
            rows={3}
          />
          <p className="text-sm text-gray-500 mt-1">
            Separate multiple features with commas
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="technologies"
            className="block text-gray-700 font-semibold mb-2"
          >
            Technologies
          </label>
          <input
            type="text"
            id="technologies"
            {...register("technologies")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="React, Node.js, MongoDB (comma separated)"
          />
          <p className="text-sm text-gray-500 mt-1">
            Separate multiple technologies with commas
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
