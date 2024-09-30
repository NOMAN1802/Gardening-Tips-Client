import { TPost } from '@/src/types'; // Import your TPost type
import Image from 'next/image';
import Link from 'next/link';
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";

interface PostCardProps {
  post: TPost;
  layout?: "grid" | "list";
}

const PostCard: React.FC<PostCardProps> = ({ post, layout = "grid" }) => {
  const truncateText = (text: string, wordLimit: number) => {
    return text.split(' ').slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <div
      className={`bg-default-100 relative rounded overflow-hidden shadow-xl transform hover:scale-105 duration-300 -right-1 -skew-x-2 ${
        layout === "list" ? "flex space-x-4 p-4" : ""
      }`}
    >
      {/* Post image container with hover transition */}
      <div className={`relative ${layout === "list" ? "w-40 h-40" : "w-full h-80 mb-4"} group`}>
        {/* Main post image */}
        <Image
          src={post.images[0]}
          alt={post.title}
          fill
          sizes={layout === "list" ? "15vw" : "25vw"}
          className="absolute object-cover rounded-md transition-opacity ease-in-out duration-500"
        />

        {/* Heart Icon for favorites (absolute positioned) */}
        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition">
          <FaHeart className="text-red-500" />
        </div>
      </div>

      {/* Post details */}
      <div className={`flex flex-col ${layout === "list" ? "w-full justify-between" : "items-start my-2 py-2 space-y-2"}`}>
        {/* Post title */}
        <div className="font-semibold text-lg text-default-600 mx-2">
          {post.title}
        </div>

        {/* Category label */}
        <div className="text-sm text-gray-500 mx-2">Category: {post.category}</div>

        {/* Post description with read more */}
        <div className="text-sm text-gray-700 mx-2">
          {truncateText(post.postDetails, 20)}{' '}
          <Link href={`/posts/${post._id}`}>
            <span className="text-blue-500">Read more...</span>
          </Link>
        </div>

        {/* Author and profile photo */}
        <div className="flex items-center gap-2 mx-2 mt-4">
          <Image
            src={post.author.profilePhoto}
            alt={post.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm text-gray-700">{post.author.name}</div>
        </div>

        {/* Post votes */}
        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mx-2">
            <FaThumbsUp className="text-green-500" />
            <span>{post.upVotes}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mx-2">
            <FaThumbsDown className="text-red-500" />
            <span>{post.downVotes}</span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="flex justify-end w-full mt-4 px-2">
          <Link href={`/posts/${post._id}`}>
            <button className="py-2 px-4 text-sm font-medium text-default-600 border border-default-600 rounded-2xl hover:bg-default-600 hover:text-white transition-colors duration-200">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
