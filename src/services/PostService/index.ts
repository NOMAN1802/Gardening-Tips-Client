// services/PostService.ts
import envConfig from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";

export const getAllPosts = async (type?: string, wait = false, category?: string) => {
  let fetchOptions: RequestInit = {
    method: "GET",
    cache: "no-store",
  };

  if (type === "isr") {
    fetchOptions = {
      next: {
        tags: ["posts"],
      },
    };
  }

  const url = new URL(`${envConfig.baseApi}/posts`);
  if (category) {
    url.searchParams.append("category", category); 
  }

  const res = await fetch(url.toString(), fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }

  if (wait) {
    await delay(2000); 
  }

  return res.json();
};
