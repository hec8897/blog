import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { Post } from "@/types/post";

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <div className="space-y-8">
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

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};
