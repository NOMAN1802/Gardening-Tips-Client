"use client";
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner'; // Import sonner toast
import { FaThumbsUp, FaThumbsDown, FaHeart, FaRegHeart, FaUserPlus, FaUserMinus, FaRegUser, FaRegTrashAlt } from 'react-icons/fa';
import { TPost } from '@/src/types';
import PageTitle from '../PageTitle/PageTitle';
import CommentSection from '../Comment/Comment';
import { AiOutlineMessage } from 'react-icons/ai';
interface PostDetailsProps {
  post: TPost; 
  refetchPost: () => void;
}


const PostDetails: React.FC<PostDetailsProps> = ({ post, refetchPost }) => {
const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [following, setFollowing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(post.images[0]);

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    if (downvoted) setDownvoted(false); // Reset downvote if upvoted
    toast.success(`You ${upvoted ? 'removed' : 'added'} an upvote!`);

    // Implement backend logic here to handle upvote
    // Example: POST /api/posts/{postId}/upvote
  };

  const handleDownvote = () => {
    setDownvoted(!downvoted);
    if (upvoted) setUpvoted(false); // Reset upvote if downvoted
    toast.success(`You ${downvoted ? 'removed' : 'added'} a downvote!`);

    // Implement backend logic here to handle downvote
    // Example: POST /api/posts/{postId}/downvote
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    toast.success(`${favorite ? 'Removed from' : 'Added to'} favorites!`);

    // Implement backend logic here to handle adding/removing from favorites
    // Example: POST /api/posts/{postId}/favorite
  };

  const handleFollow = () => {
    setFollowing(!following);
    toast.success(`${following ? 'Unfollowed' : 'Followed'} ${post.author.name}!`);

    // Implement backend logic here to follow/unfollow the author
    // Example: POST /api/users/{authorId}/follow
  };

  

  return (

    <>
    <PageTitle heading={` ${post.title}` } subHeading={`Learm more about ${post.category} `}/>
    <div className="container mx-auto py-10 px-6">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
          {/* Main Image */}
          <div className="mb-4">
            <Image
              src={selectedImage}
              alt={post.title}
              width={600}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2">
            {post.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(image)}
                className={`border rounded-md ${selectedImage === image ? 'border-black' : 'border-default-300'}`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${idx + 1}`}
                  width={100}
                  height={120}
                  className="rounded-md"
                />
              </button>
            ))}
          </div>

          {/* Upvote, Downvote, Favorite Icons */}
          <div className="flex justify-between items-center my-6">
            <div className="flex space-x-4">
              <div onClick={handleUpvote} className="flex items-center space-x-2 cursor-pointer">
                <FaThumbsUp size={24} className={`${upvoted ? 'text-blue-500' : 'text-gray-400'}`} />
                <span>{post.upVotes + (upvoted ? 1 : 0)}</span>
              </div>
              <div onClick={handleDownvote} className="flex items-center space-x-2 cursor-pointer">
                <FaThumbsDown size={24} className={`${downvoted ? 'text-red-500' : 'text-gray-400'}`} />
                <span>{post.downVotes + (downvoted ? 1 : 0)}</span>
              </div>
            </div>
            <div onClick={handleFavorite} className="flex items-center space-x-2 cursor-pointer">
              {favorite ? <FaHeart size={24} className="text-red-500" /> : <FaRegHeart size={24} className="text-gray-400" />}
              <span>{favorite ? 'Added to Favorites' : 'Add to Favorites'}</span>
            </div>
          </div>

          
        </div>

        {/* Post Details and Author Info */}
        <div className="w-full lg:w-2/5 lg:pl-6 space-y-10">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <h2 className="text-2xl font-semibold mb-4">{post.category}</h2>
          <p className="text-lg text-gray-700 mb-6">{post.postDetails}</p>

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-6">
            <Image
              src={post.author.profilePhoto}
              alt={post.author.name}
              width={60}
              height={60}
              className="rounded-full shadow-lg"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">author:{post.author.name}</span>
              <span className="text-sm font-semibold">email:{post.author.email}</span>

              <button
                onClick={handleFollow}
                className="flex items-center mt-2 space-x-1 text-blue-500 hover:underline"
              >
                {following ? (
                  <>
                    <FaUserMinus /> <span>Unfollow</span>
                  </>
                ) : (
                  <>
                    <FaUserPlus /> <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Premium Post Indicator */}
          {post.isPremium && (
            <div className="text-md text-yellow-500 font-bold mb-4">
              This is a premium post
            </div>
          )}
        </div>
      </div>
      {/* Comments Section */}
      <div className=" my-6">
      <CommentSection postId={post._id} refetchPost={refetchPost} />
    </div>

    <div className='mt-4 sm:w-full md:w-1/2 '>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className='mb-4 card w-2/3 bg-default-100 p-4 space-y-2 rounded-lg shadow-lg'>
              
              <p className='flex gap-2  items-center'><FaRegUser/> <span>{comment?.commentator?.name}</span></p>
              
              <div className='flex items-center justify-between'>
                
              <p className='flex gap-2 items-center'><AiOutlineMessage /> <span>{comment?.content}</span></p>
              <button className='relative cursor-pointer'
            //   disabled={ !user}
            //   onClick={() => handleDeleteReview(index)}
              >
              <FaRegTrashAlt className='absolute right-3 bottom-1'/>
              </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
        </div>
    </div>
    </>
    
  );
};

export default PostDetails;

