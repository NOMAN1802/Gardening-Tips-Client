import React from 'react';
import PostDetails from '@/src/components/PostDetails/PostDetails';
import { getPost } from '@/src/services/PostService';
import Container from '@/src/components/Container/Container';




type TProps = {
    params: {
      postId: string;
    };
  };
const PostDetailsPage = async({params}: TProps) => {
    const {data: post} = await getPost(params.postId);
    console.log(post)
    return (
        <Container>
            
           <PostDetails post={post}/>
        </Container>
    );
};

export default PostDetailsPage;