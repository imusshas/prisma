import { createPost } from "@/actions";
import CreatePostForm from "@/components/CreatePostForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-3xl font-bold">Welcome to Prisma Blog</h1>
      <Link href={"/posts"} className="hover:border-b hover:border-primary">
        View Posts
      </Link>
      <CreatePostForm formAction={createPost} />
    </div>
  );
}
