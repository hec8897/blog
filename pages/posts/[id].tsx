import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import { getAllPostIds, getPostById } from "@/lib/posts";
import { Post } from "@/types/post";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Comments from "@/components/Comments";

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <Layout>
      <article className="prose max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-1 text-gray-600">
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{post.author}</span>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100  text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="prose-content text-gray-800 leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ ...props }) => {
                  const src =
                    typeof props.src === "string" && props.src.startsWith("/")
                      ? `/blog${props.src}`
                      : props.src;
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...props}
                      src={src}
                      alt={props.alt || ""}
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  );
                },
              }}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="border-t border-gray-200 mt-12 pt-12">
          <Comments />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getAllPostIds();
  const paths = ids.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const post = getPostById(params?.id as string);

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
