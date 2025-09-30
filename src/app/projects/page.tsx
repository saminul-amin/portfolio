import { Blog } from "@/types";
import BlogCard from "@/components/BlogCard";

// ISR - Incremental Static Regeneration
async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 text-center">Blog Posts</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about web development.
        </p>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No blogs found. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
