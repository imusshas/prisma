import PostPreview from "@/components/PostPreview";
import { prisma } from "@/lib/prisma";

export default async function PostsPage() {
  const user = await prisma.user.findUnique({
    where: { email: "john@gmail.com" },
    include: { posts: true },
  });

  // const posts = await prisma.post.findMany({
  //   // where: { published: true },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   // select: {},
  //   take: 10,
  // });

  return (
    <div className="flex flex-col items-center gap-12">
      <h1 className="text-3xl font-bold">All Posts ({user?.posts.length || 0})</h1>
      <ul className="w-full flex flex-col gap-6">
        {user?.posts.map((post) => (
          <li key={post.id}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
