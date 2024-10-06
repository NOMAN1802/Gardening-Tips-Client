
import React from 'react'
import SectionTitle from '@/src/components/SectionTitle/SectionTitle'
import Container from '@/src/components/Container/Container';
import { getAllTrandingPosts } from '@/src/services/PostService';
import TrandingPosts from '@/src/components/TrandingPosts/TrandingPosts'
const TrandingPostsPage = async() => {

    const { data: posts } = await getAllTrandingPosts("isr");
    
  return (
    <Container>
        <SectionTitle heading='Tranding Posts'/>

       
       <TrandingPosts posts={posts?.posts}/>         

    </Container>
  )
}

export default TrandingPostsPage;



