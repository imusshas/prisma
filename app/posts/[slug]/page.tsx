import PostPreview from "@/components/PostPreview";
import { prisma } from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";

const getCachedPost = cache((slug) => {
  return prisma.post.findUnique({ where: { slug } });
});

const PostDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const post = await getCachedPost(slug);
  return post ? <PostPreview post={post} preview /> : <h2>404 | Post Not Found</h2>;
};

export default PostDetailsPage;
