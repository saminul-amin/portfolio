import { Blog } from "@/types";
import Link from "next/link";

// ISR with dynamic params
async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const blog = await getBlog(params.id);

  if (!blog) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <Link href="/blogs" className="text-primary hover:underline">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/blogs"
          className="text-primary hover:underline mb-6 inline-block"
        >
          ← Back to Blogs
        </Link>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <span>By {blog.author.name}</span>
          <span>•</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </div>
  );
}
