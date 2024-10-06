import Container from "@/src/components/Container/Container";
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
    <Container>
      <div className="my-8">
        <h1 className="text-xl lg:text-3xl 2xl:text-5xl">All Posts</h1>
        <FilteredPosts posts={posts?.posts}  />
      </div>
    </Container>
  );
};

export default NewsFeedPage;
