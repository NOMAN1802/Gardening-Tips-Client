import React from 'react';
import PostDetailsPage from '@/src/components/ProductDetails/ProductsDetails';
import { getPost } from '@/src/services/PostService';
import Container from '@/src/components/Container/Container';




type TProps = {
    params: {
      postId: string;
    };
  };
const ProductDetailsPage = async({params}: TProps) => {
    const {data: post} = await getPost(params.postId);
    console.log(post)
    return (
        <Container>
            
           <PostDetailsPage post={post}/>
        </Container>
    );
};

export default ProductDetailsPage;