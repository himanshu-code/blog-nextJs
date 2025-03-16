import Link from "next/link";
import { Button } from "@/app/ui/components/button";
import Post from "@/app/ui/components/posts/Post";
import { connectToDB, getPosts } from "@/app/lib/data";
import { auth } from "../../../../auth.config";
export default async function Page() {
  const client = await connectToDB();
  const _post = await getPosts(client);
  const session = await auth();
  return (
    <>
      {session?.user && (
        <Link href="/blog/post/add">
          <Button className="outline outline-1  border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white my-5 py-2 px-4 rounded">
            New +
          </Button>
        </Link>
      )}

      <h1>Posts</h1>
      {_post.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}
