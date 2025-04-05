import { updatePost } from "@/actions";
import CreatePostForm from "@/components/CreatePostForm";
import { prisma } from "@/lib/prisma";
import React from "react";

const EditPostForm = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const post = await prisma.post.findUnique({ where: { slug } });

  return (
    <div className="flex items-center justify-center">
      <CreatePostForm title={post?.title} content={post?.content} formAction={updatePost} />
    </div>
  );
};

export default EditPostForm;
