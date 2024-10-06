import Container from "@/src/components/Container/Container";
import Loading from "@/src/components/Loading/Loading";
import Category from "@/src/components/modules/Home/PostCategories/Category";
import { getAllPosts } from "@/src/services/PostService";
import { Suspense } from "react";

const PostCategory = async ({
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
      <h1 className="text-xl lg:text-4xl my-12">
        All Posts of your selected category
      </h1>
      <Suspense fallback={<Loading />}>
      <Category posts={posts?.posts} />
      </Suspense>
    </Container>
  );
};

export default PostCategory;
