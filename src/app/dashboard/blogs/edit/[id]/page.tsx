"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Blog | Saminofolio",
};

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: "",
    published: true,
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await api.get(`/blogs/${params.id}`);
      const blog = response.data.data;

      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || "",
        coverImage: blog.coverImage || "",
        tags: blog.tags ? blog.tags.join(", ") : "",
        published: blog.published,
      });
    } catch (error) {
      toast.error("Failed to fetch blog");
      router.push("/dashboard/blogs");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }

    if (formData.title.length > 200) {
      toast.error("Title must be less than 200 characters");
      return;
    }

    if (formData.excerpt && formData.excerpt.length > 300) {
      toast.error("Excerpt must be less than 300 characters");
      return;
    }

    setLoading(true);

    try {
      const tagsArray = formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      const response = await api.put(`/blogs/${params.id}`, {
        ...formData,
        tags: tagsArray,
      });

      if (response.data.success) {
        toast.success("Blog updated successfully!");
        router.push("/dashboard/blogs");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update blog";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Edit Blog</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Enter blog title"
            maxLength={200}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.title.length}/200 characters
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="excerpt"
            className="block text-gray-700 font-semibold mb-2"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Brief summary of the blog (optional)"
            rows={3}
            maxLength={300}
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.excerpt.length}/300 characters
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="coverImage"
            className="block text-gray-700 font-semibold mb-2"
          >
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            value={formData.coverImage}
            onChange={(e) =>
              setFormData({ ...formData, coverImage: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-gray-700 font-semibold mb-2"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="javascript, react, web development (comma separated)"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Content *
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="ml-2 text-gray-700">Published</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
