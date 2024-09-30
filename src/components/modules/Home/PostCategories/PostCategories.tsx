"use client";

import React from 'react';
import PostCategoryCard from './PostCategoryCard';
import { postCategories } from './postCategoriesData';
import SectionTitle from '@/src/components/SectionTitle/SectionTitle';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/src/components/Container/Container';

const PostCategories: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;

  const handleCategoryChange = (label: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('category', label);

    router.push(`/post-category?${updatedSearchParams.toString()}`);
  };

  return (
    <Container>
      <div className="overflow-x-hidden px-6 py-10">
        <SectionTitle heading="Post Categories" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6  gap-6">
          {postCategories.map((item) => (
            <PostCategoryCard
              label={item.label}
              image={item.image}
              key={item.label}
              selected={category === item.label}
              onClick={() => handleCategoryChange(item.label)}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PostCategories;
