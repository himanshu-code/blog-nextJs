import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/posts/Post";
import { notFound } from "next/navigation";
import { connectToDB, getPosts } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const client = await connectToDB();
  const _post = await getPosts(client);
  const post = _post.find((post) => post.id === params.id);
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
