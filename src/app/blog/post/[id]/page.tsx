import Post from "@/app/ui/components/posts/Post";
import { notFound } from "next/navigation";
import { getPosts } from "@/app/lib/data";
import { Post as TypePost } from "@/app/lib/definition";

export default async function Page({ params }: { params: { id: string } }) {
  const _post = await getPosts();
  const post = _post?.find((post: TypePost) => post.id === params.id);
  if (!post) {
    notFound();
  } else {
    return (
      <>
        <h1>Post</h1>
        {post && <Post {...post} />}
      </>
    );
  }
}
