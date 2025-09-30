import { Blog } from "@/types";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link href={`/blogs/${blog._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full cursor-pointer">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            By {blog.author.name} • {formatDate(blog.createdAt)}
          </p>
          {blog.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
          )}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
