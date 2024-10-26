"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaRegUser, FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import { TPost } from '@/src/types';
import CommentSection from '../Comment/Comment';
import DOMPurify from 'dompurify';
import { usePostActions } from '@/src/hooks/user.hook';
import { useUser } from '@/src/context/user.provider';
import { useEditComment, useDeleteComment } from '@/src/hooks/post.hook';
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import {motion} from "framer-motion"


interface Comment {
  _id: string;
  content: string;
  commentator: {
    _id: string;
    name: string;
  };
}

interface PostDetailsProps {
  post: TPost; 
  refetchPost: () => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post: initialPost, refetchPost }) => {
  const [post, setPost] = useState<TPost>(initialPost);
  const { user } = useUser();
  const { handleVote, isVoting } = usePostActions();
  const [selectedImage, setSelectedImage] = useState(post.images[0]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  

  const sanitizedPostDetails = DOMPurify.sanitize(post.postDetails);

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  const handleVoteClick = async (voteType: 'upvote' | 'downvote') => {
    if (!user) {
      toast.error("Please log in to vote");
      return;
    }
    const updatedPost = await handleVote(post._id, voteType);
    if (updatedPost) {
      setPost(prevPost => ({
        ...prevPost,
        ...updatedPost,
        upVotes: updatedPost.upVotes,
        downVotes: updatedPost.downVotes,
        upvotedBy: updatedPost.upvotedBy,
        downvotedBy: updatedPost.downvotedBy
      }));
      refetchPost(); 
    }
  };


  const editCommentMutation = useEditComment();
  const deleteCommentMutation = useDeleteComment();
 
  const handleEdit = (comment: Comment) => {
    if (comment && comment.content) {
      setEditingCommentId(comment._id);
      setEditContent(comment.content);
    } else {
      toast.error("Cannot edit this comment");
    }
  };

  const handleSaveEdit = (commentId: string) => {
    if (!user) {
      toast.error("Please log in to edit comments");
      return;
    }
    const formData = new FormData();
    formData.append('content', editContent);
    formData.append('userId', user._id);
  
    editCommentMutation.mutate(
      { postId: post._id, commentId, commentData: formData },
      {
        onSuccess: (updatedComment) => {
          setPost(prevPost => ({
            ...prevPost,
            comments: prevPost.comments.map(comment => 
              comment._id === commentId 
                ? { ...comment, content: editContent }
                : comment
            )
          }));
          setEditingCommentId(null);
          setEditContent('');
          toast.success("Comment edited successfully");
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to edit comment");
        }
      }
    );
  };
  
  const handleDelete = (commentId: string) => {
    if (!user) {
      toast.error("Please log in to delete comments");
      return;
    }
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const commentData = new FormData();
      commentData.append('userId', user._id);
  
      deleteCommentMutation.mutate(
        { postId: post._id, commentId, commentData },
        {
          onSuccess: () => {
            setPost(prevPost => ({
              ...prevPost,
              comments: prevPost.comments.filter(comment => comment._id !== commentId)
            }));
            toast.success("Comment deleted successfully");
          },
          onError: (error: any) => {
            console.error('Delete Comment Error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to delete comment");
          }
        }
      );
    }
  };

  const isUpvoted = user?._id && post.upvotedBy?.includes(user._id);
  const isDownvoted = user?._id && post.downvotedBy?.includes(user._id);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add post title
    doc.setFontSize(18);
    doc.text(post.title, 20, 20);
    
    // Add post category
    doc.setFontSize(14);
    doc.text(`Category: ${post.category}`, 20, 30);
    
    // Add post details
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(post.postDetails, 180);
    doc.text(splitText, 20, 40);
    
    // Add author info
    doc.setFontSize(14);
    doc.text('Author Information:', 20, doc.internal.pageSize.height - 40);
    doc.setFontSize(12);
    doc.text(`Name: ${post.author.name}`, 20, doc.internal.pageSize.height - 30);
    doc.text(`Email: ${post.author.email}`, 20, doc.internal.pageSize.height - 20);
    
    // Save the PDF
    doc.save(`${post.title}.pdf`);
  };

  return (
    <>

      
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto text-center md:w-4/12 my-[60px]">
          <h3 className="text-4xl  text-default-900 py-4">{post.title}</h3>
          <p className="text-center mt-2 italic text-default-600">
          {`Learn more about ${post.category}`}
          </p>
        </div>
      </motion.div>
      <div className="mx-auto py-10 px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Image Section */}
          <div className="w-full h-2/3 mb-6 lg:mb-0">
            {/* Main Image */}
            <div className="mb-4">
              <Image
                src={selectedImage}
                alt={post.title}
                width={700}
                height={500}
                className="rounded-lg shadow-lg object-cover" 
                style={{ maxHeight: '550px', width: '100%', height: 'auto' }}
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

            {/* Upvote, Downvote Icons */}
            <div className="flex justify-start items-center my-6">
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleVoteClick('upvote')} 
                  disabled={isVoting}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <FaThumbsUp size={24} className={isUpvoted ? 'text-blue-600' : 'text-default-400'} />
                  <span>{post?.upVotes}</span>
                </button>
                <button 
                  onClick={() => handleVoteClick('downvote')} 
                  disabled={isVoting}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <FaThumbsDown size={24} className={isDownvoted ? 'text-red-500' : 'text-default-400'} />
                  <span>{post?.downVotes}</span>
                </button>


              </div>
            </div>
          </div>
         
          {/* Post Details and Author Info */}
          <div className="w-full lg:pl-6 space-y-10">
            {/* Download PDF Button */}
            <Button onClick={generatePDF} color="default">
              Download Post Details (PDF)
           </Button>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <h2 className="text-2xl font-semibold mb-4">{post.category}</h2>
            <p className="text-lg text-default-700 mb-6" dangerouslySetInnerHTML={{ __html: sanitizedPostDetails }}></p>

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
                <span className="text-sm font-semibold">author: {post.author.name}</span>
                <span className="text-sm font-semibold">email: {post.author.email}</span>
              </div>
            </div>

         
          </div>
           
            
        </div>
        {/* Comments Section */}
        <div className="my-6">
          <CommentSection postId={post._id} refetchPost={refetchPost} />
        </div>

        <div className='mt-4 sm:w-full md:w-1/2'>
  {post.comments && post.comments.length > 0 ? (
    post.comments.map((comment: Comment, index) => (
      <div key={comment._id || index} className='mb-4 card w-2/3 bg-default-100 p-4 space-y-2 rounded-lg shadow-lg'>
        <p className='flex gap-2 items-center'>
          <FaRegUser/> 
          <span>{comment.commentator?.name || 'Unknown User'}</span>
        </p>
        <div className='flex items-center justify-between'>
          {editingCommentId === comment._id ? (
            <div className="w-full">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full mb-2 p-2 border border-default-300 rounded-lg"
              />
              <Button onClick={() => handleSaveEdit(comment._id)} className="mr-2">Save</Button>
              <Button onClick={() => setEditingCommentId(null)}>Cancel</Button>
            </div>
          ) : (
            <>
              <p className='flex gap-2 items-center'>
                <AiOutlineMessage /> 
                <span>{comment.content}</span>
              </p>
              {user && user._id === comment.commentator?._id && (
                <div className="flex">
                  <button className='relative cursor-pointer mr-2' onClick={() => handleEdit(comment)}>
                    <FaEdit className='text-blue-500'/>
                  </button>
                  <button className='relative cursor-pointer' onClick={() => handleDelete(comment._id)}>
                    <FaRegTrashAlt className='text-red-500'/>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    ))
  ) : (
    <p>No comments available</p>
  )}
</div>
      </div>
    </>
  );
};

export default PostDetails;
