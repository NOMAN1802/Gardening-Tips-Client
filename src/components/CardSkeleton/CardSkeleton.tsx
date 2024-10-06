import { Skeleton } from '@nextui-org/skeleton';

interface PostCardSkeletonProps {
  layout?: "grid" | "list";
}

const PostCardSkeleton: React.FC<PostCardSkeletonProps> = ({ layout }) => {
  return (
    <div
      className={`bg-default-100 relative rounded overflow-hidden shadow-xl transform hover:scale-105 duration-300 -right-1 -skew-x-2 ${
        layout === "list" ? "flex space-x-4 p-4" : ""
      }`}
    >
      {/* Skeleton for post image */}
      <div className={`relative ${layout === "list" ? "w-40 h-40" : "w-full h-80 mb-4"} group`}>
        <Skeleton className="absolute w-full h-full rounded-md" />
      </div>

      {/* Skeleton for post details */}
      <div
        className={`flex flex-col ${
          layout === "list" ? "w-full justify-between" : "items-start my-2 py-2 space-y-2"
        }`}
      >
        {/* Skeleton for title */}
        <Skeleton className="h-6 w-3/4 mx-2" />

        {/* Skeleton for category */}
        <Skeleton className="h-4 w-1/3 mx-2" />

        {/* Skeleton for premium/free chip */}
        <Skeleton className="h-4 w-1/4 mx-2" />

        {/* Skeleton for post content */}
        <Skeleton className="h-4 w-full mx-2" />

        {/* Skeleton for author info */}
        <div className="flex items-center gap-2 mx-2 mt-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        {/* Skeleton for votes */}
        <div className="flex items-center justify-between w-full mt-4">
          <Skeleton className="h-4 w-1/4 mx-2" />
          <Skeleton className="h-4 w-1/4 mx-2" />
        </div>

        {/* Skeleton for button */}
        <div className="flex justify-end w-full mt-4 px-2">
          <Skeleton className="h-8 w-20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
