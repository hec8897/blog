import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">
            안녕하세요, 제 블로그에 오신 것을 환영합니다
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            개발, 일상, 그리고 배움에 대한 이야기
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">최근 글</h2>
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
