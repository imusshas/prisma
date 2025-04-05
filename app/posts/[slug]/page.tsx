import PostPreview from "@/components/PostPreview";
import { prisma } from "@/lib/prisma";

const PostDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const post = await prisma.post.findUnique({ where: { slug } });
  return post ? <PostPreview post={post} preview /> : <h2>404 | Post Not Found</h2>;
};

export default PostDetailsPage;
