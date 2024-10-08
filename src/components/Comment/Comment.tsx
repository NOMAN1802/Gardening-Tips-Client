import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "sonner";

import { useCreateComment } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";

export interface Comment {
  commentator: string;
  content: string;
}

interface CommentSectionProps {
  postId: string;
  refetchPost: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  refetchPost,
}) => {
  const [content, setContent] = useState<string>("");
  const { user } = useUser();

  const { mutate: handleComment } = useCreateComment(postId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to comment.");

      return;
    }

    const commentData = {
      commentator: user._id,
      content,
    };

    handleComment(commentData, {
      onSuccess: (newComment) => {
        refetchPost();
        setContent("");
      },
    });
  };

  return (
    <div className="w-full lg:w-1/2 p-4 bg-default-100 rounded-lg shadow-lg">
      <h3>Comments</h3>

      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <textarea
          className="w-full mb-2 p-4 border border-default-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-default-500"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="w-1/4 rounded-lg">
          <Button className="bg-default-500" type="submit">
            Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
