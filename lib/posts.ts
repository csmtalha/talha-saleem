import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
  // Check if we're on the server side
  if (typeof window !== "undefined") {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        metadata: data,
        content,
      };
    });

    return posts;
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

export async function getAllPostsAsync() {
  // Check if we're on the server side
  if (typeof window !== "undefined") {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        metadata: data,
        content,
      };
    });

    return posts;
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}
