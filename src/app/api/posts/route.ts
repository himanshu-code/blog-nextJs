import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/data";
import { auth } from "../../../../auth.config";

export async function GET() {
  try {
    const posts = await sql`SELECT * FROM posts ORDER BY date DESC LIMIT 2;`;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const client = await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const title = searchParams.get("title");
    const content = searchParams.get("content");
    const date = searchParams.get("date");
    const author = searchParams.get("author");
    // SQL query to insert a new post
    if (!session) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    if (!client) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }
    await client
      .from("posts")
      .insert({
        id: id,
        title: title,
        author: author,
        content: content,
        date: date,
      })
      .select()
      .single();
    return NextResponse.json({ message: "Post successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
