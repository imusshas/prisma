"use server";

import { prisma } from "@/lib/prisma";
import { createPostSchema } from "@/schemas/createPostSchema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    const parseResult = createPostSchema.safeParse(rawData);

    if (!parseResult.success) {
      console.error("Validation failed:", parseResult.error.flatten().fieldErrors);
      return;
    }

    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
        content: formData.get("content") as string,
        author: {
          connect: {
            email: "john@gmail.com",
          },
        },
      },
    });

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(error.message);
        
      }
    }
  }
  
  redirect("/posts");
}

export async function updatePost(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const parseResult = createPostSchema.safeParse(rawData);

  if (!parseResult.success) {
    // Optional: handle errors in a better way depending on your app
    console.error("Validation failed:", parseResult.error.flatten().fieldErrors);
    return;
  }

  await prisma.post.update({
    where: { title: rawData.title as string },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
      content: formData.get("content") as string,
    },
  });

  redirect("/posts");
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/posts");
}
