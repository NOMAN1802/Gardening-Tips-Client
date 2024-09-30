import React, { useState } from 'react';
import { useUser } from '@/src/context/user.provider';
import { Button } from '@nextui-org/button';
// import { useCreateComment } from '@/src/hooks/post.hook';
import envConfig from '@/src/config/envConfig';
import { toast } from 'sonner';

interface Comment {
  _id: string;
  commentator: string;  
  content: string;
  createdAt?: string | undefined,
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>(''); 

  const { user } = useUser();
//   const { mutate: handleCreateComment } = useCreateComment(postId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    const commentData = {
      commentator: user?._id,
      content,
    };

    try {
        // Send a POST request to your backend API
        const response = await fetch(`${envConfig.baseApi}/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        });
  
        if (response.ok) {
        toast.success('Feedback submitted successfully!');
          // Reset the form values
          setComments([]);
          
        } else {
          console.error('Error submitting feedback');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div>
      <h3>Comments</h3>
      
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)} 
          className="w-2/3 h-32 px-4 py-3 rounded-md"
        />
        <div className="w-1/4 rounded-lg">
          <Button className="bg-default-500" type="submit" disabled={!user}>
            Comment
          </Button>
        </div>
      </form>


    </div>
  );
};

export default CommentSection;
