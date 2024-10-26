import PostCardSkeleton from "@/src/components/CardSkeleton/CardSkeleton";
import FilterSectionSkeleton from "@/src/components/CardSkeleton/FilterSectionSkeleton";
import UserPostCountSkeleton from "@/src/components/CardSkeleton/UserPostCountSkeleton";
import Container from "@/src/components/Container/Container";

const Loading = ({ layout = "grid" }) => {
  return (
    <Container>
      <h1 className="text-xl lg:text-3xl 2xl:text-5xl mb-4">All Posts</h1>
      
      {/* Main grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-8">
        
        {/* Filter Section */}
        <div className="col-span-1">
          <FilterSectionSkeleton />
        </div>
        
        {/* Post Card Skeleton Section */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {[...Array(4)].map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </div>
        
        {/* User Post Count Section */}
        <div className="col-span-1">
          <UserPostCountSkeleton />
        </div>
      </div>
    </Container>
  );
};

export default Loading;
