import FilteredPosts from "@/src/components/FilteredPosts/FilteredPosts";
import { getAllPosts } from "@/src/services/PostService";

const NewsFeedPage = async ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const params = new URLSearchParams(searchParams);
  const category = params.get("category") || undefined;

  // Fetch posts based on category
  const { data: posts } = await getAllPosts("ssr", category);

  return (
    
      <div>
        
        <FilteredPosts posts={posts?.posts}  />
      </div>
    
  );
};

export default NewsFeedPage;
