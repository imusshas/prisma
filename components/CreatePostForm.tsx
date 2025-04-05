"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPostSchema } from "@/schemas/createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const CreatePostForm = ({
  title = "",
  content = "",
  formAction,
}: {
  title?: string;
  content?: string;
  formAction(formData: FormData): Promise<void>;
}) => {
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: title,
      content: content,
    },
  });

  return (
    <Form {...form}>
      <form action={formAction} className="flex flex-col gap-4 w-[400px] mt-12">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input id="title" placeholder="Enter Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea id="content" placeholder="Enter your content here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{title ? "Edit Post" : "Create Post"}</Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
