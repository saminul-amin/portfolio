"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import api from "@/lib/api";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor";

interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string;
  published: boolean;
}

export default function CreateBlog() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    defaultValues: {
      published: true,
    },
  });

  const titleLength = watch("title")?.length || 0;
  const excerptLength = watch("excerpt")?.length || 0;

  const onSubmit = async (data: BlogFormData) => {
    try {
      const tagsArray = data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      const response = await api.post("/blogs", {
        ...data,
        tags: tagsArray,
      });

      if (response.data.success) {
        toast.success("Blog created successfully!");
        router.push("/dashboard/blogs");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create blog";
      toast.error(message);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Create New Blog</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
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
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 200,
                message: "Title must be less than 200 characters",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {titleLength}/200 characters
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
            {...register("excerpt", {
              maxLength: {
                value: 300,
                message: "Excerpt must be less than 300 characters",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Brief summary of the blog (optional)"
            rows={3}
          />
          {errors.excerpt && (
            <p className="text-red-600 text-sm mt-1">
              {errors.excerpt.message}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {excerptLength}/300 characters
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
            {...register("coverImage", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="https://example.com/image.jpg"
          />
          {errors.coverImage && (
            <p className="text-red-600 text-sm mt-1">
              {errors.coverImage.message}
            </p>
          )}
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
            {...register("tags")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="javascript, react, web development (comma separated)"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Content *
          </label>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <RichTextEditor
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-600 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("published")}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="ml-2 text-gray-700">Publish immediately</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Create Blog"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
