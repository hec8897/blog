import Link from "next/link";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
      </Link>
      <div className="text-sm text-gray-500 mb-3">
        <span>{post.date}</span>
        <span className="mx-1">&middot;</span>
        <span>{post.author}</span>
      </div>
      <p className="text-gray-700 mb-4">{post.excerpt}</p>
      <div className="flex gap-2 flex-wrap">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700">
            #{tag}
          </span>
        ))}
      </div>
      <Link
        href={`/posts/${post.id}`}
        className="inline-block mt-4 text-blue-600 hover:underline font-medium">
        더 읽기 →
      </Link>
    </article>
  );
}
