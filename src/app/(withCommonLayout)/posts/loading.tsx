import PostCardSkeleton from "@/src/components/CardSkeleton/CardSkeleton";
import Container from "@/src/components/Container/Container";

const Loading = ({ layout = "grid" }) => {
  return (
    <Container>
      <div className="my-8">
        <h1 className="text-xl lg:text-3xl 2xl:text-5xl">All Posts</h1>

        <div className={`grid ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-6`}>
          {[...Array(9)].map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Loading;
