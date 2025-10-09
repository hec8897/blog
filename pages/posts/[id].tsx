import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import { posts } from "@/data/posts";
import { Post } from "@/types/post";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <Layout>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{post.author}</span>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="prose-content text-gray-800 dark:text-gray-200 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const post = posts.find((p) => p.id === params?.id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
