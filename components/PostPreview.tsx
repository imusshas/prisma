"use client";
import { deletePost } from "@/actions";
import { Post } from "@prisma/client";
import { DeleteIcon, Edit2 } from "lucide-react";
import Link from "next/link";

const PostPreview = ({ post, preview }: { post: Post; preview?: boolean }) => {
  return (
    <div className="space-y-2 w-full p-4 border rounded-md shadow shadow-accent text-foreground">
      <div className="flex items-top gap-4">
        <Link href={`/posts/${post.slug}`} className="flex-1 space-y-2">
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          {!preview && <p className="text-sm text-muted-foreground">Created at: {post.createdAt.toLocaleString()}</p>}
        </Link>
        {preview ? (
          <p className="text-sm text-muted-foreground">Updated at: {post.updatedAt.toLocaleString()}</p>
        ) : (
          <>
            <Link href={`/posts/edit/${post.slug}`}>
              <Edit2 className="text-chart-5" />
            </Link>
            <DeleteIcon onClick={() => deletePost(post.id)} className="text-destructive cursor-pointer" />
          </>
        )}
      </div>
      {preview && <p className="mt-8">{post.content}</p>}
    </div>
  );
};

export default PostPreview;
