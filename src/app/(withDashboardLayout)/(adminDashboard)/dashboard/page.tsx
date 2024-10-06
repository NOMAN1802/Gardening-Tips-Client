"use client"
import { useUser } from '@/src/context/user.provider';
import { useGetAllPosts } from '@/src/hooks/post.hook';
import { useGetUsers } from '@/src/hooks/user.hook';
import { Button } from '@nextui-org/button'; 
import { Card } from '@nextui-org/card';     
import Image from 'next/image';
import { FC } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';

const DashboardPage: FC = () => {

    const{user} = useUser();
    const { data: usersData, isLoading, refetch } = useGetUsers();
    const {data :posts} = useGetAllPosts();
   
    const postCount = posts?.data?.posts?.length;
   

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-default-100 p-8">
      
      {/* Main Hero Section */}
      <div className="w-full flex flex-col md:flex-row justify-between bg-default-200 rounded-lg shadow-xl p-6 relative">
        <div>
          <h2 className="text-default-500 text-3xl font-bold">
          PlantO" is a blog dedicated
          </h2>
          <p className="text-default-500 mt-2">
          to sharing expert gardening tips, advice, and techniques to help you grow a thriving garden.
          </p>
          <Button className="mt-4 bg-default-400 text-default-500 hover:bg-default-600">
            Exclusive on Planto
          </Button>
        </div>
        <div className="absolute top-0 right-0 mt-[-3rem] mr-[-2rem]">
          <img
            className='rounded-md'
            src={user?.profilePhoto} 
            width={200}
            height={200}
            alt="admin"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {/* Card 1: All Earnings */}
        <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold">All Users</h3>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold">{usersData?.data?.length}</span>
            
            <span className="text-default-500">+30.6%</span>  <BsArrowUpCircle className="text-green-500 w-5 h-5" />
          </div>
        </Card>

        {/* Card 2: Page Views */}
        <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold">Total Posts</h3>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold">{postCount}</span>
            <span className="text-default-500">+30.6%</span>   <BsArrowUpCircle className="text-green-500 w-5 h-5" />
          </div>
        </Card>

        {/* Card 3: Total Task */}
        <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold">Ravenue</h3>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold">14,568</span>
            <span className="text-default-500">+30.6%</span>  <BsArrowUpCircle className="text-green-500 w-5 h-5" />
          </div>
        </Card>

        {/* Card 4: Downloads */}
        <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold">Download</h3>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold">$30200</span>
            <span className="text-default-500">+30.6%</span>  <BsArrowUpCircle className="text-green-500 w-5 h-5" />
          </div>
        </Card>
      </div>

    </div>
  );
};

export default DashboardPage;
