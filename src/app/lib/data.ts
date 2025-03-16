import { createClient } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export async function connectToDB() {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase environment variables");
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (Error) {
    console.error("Error connecting to the database", Error);
  }
}

// import { createClient, sql } from "@vercel/postgres";

// export async function connectToDB() {
//   const client = createClient();
//   await client.connect();

//   try {
//     if (client) {
//       console.log("Connected to database");
//       return client;
//     }
//   } catch (error) {
//     console.error("Error connecting to database", error);
//   }
// }

export async function getPosts() {
  try {
    noStore();
    const client = await connectToDB();
    if (!client) {
      return [];
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await client.from("posts").select();
    console.log(data);
    return data.data;
  } catch (error) {
    console.error("Error getting posts", error);
  }
}
