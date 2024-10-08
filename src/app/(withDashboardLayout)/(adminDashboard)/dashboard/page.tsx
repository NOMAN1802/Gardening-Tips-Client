"use client"
import { useGetAllPosts } from '@/src/hooks/post.hook';
import { useGetUsers, useMyProfile } from '@/src/hooks/user.hook';
import { Button } from '@nextui-org/button'; 
import { Card } from '@nextui-org/card';     
import { FC } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { IUser } from '@/src/types';
import { usePaymentHistory } from '@/src/hooks/payment.hook';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

const DashboardPage: FC = () => {
    const { data: usersData, isLoading, refetch } = useGetUsers();
    const { data: posts } = useGetAllPosts();
    const { data, refetch: refetchMyProfile, isLoading: isMyProfileLoading } = useMyProfile();
    const {data :payment,} = usePaymentHistory();
    console.log(data?.data)
    const payments = payment?.data;
    console.log(payments)
    const user = data?.data;
    const postCount = posts?.data?.posts?.length;
    

    // Calculate total users and verified users
    const totalUsers = usersData?.data?.length || 0;
    const verifiedUsers = usersData?.data?.filter(( user :IUser) => user.isVerified).length || 0;
    
    // Sample revenue data (replace with actual data when available)
    const totalRevenue = payments ? Number(payments.length * 999) : 0;

    const chartData = {
        labels: ['Total Users', 'Verified Users', 'Total Posts', 'Total Revenue'],
        datasets: [
            {
                label: 'Dashboard Statistics',
                data: [totalUsers, verifiedUsers, postCount, totalRevenue],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Dashboard Overview',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-default-100 p-8 rounded-md">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full">
                {/* Card 1: Total Users */}
                <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold">{totalUsers}</span>
                        <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                    </div>
                </Card>

                {/* Card 2: Verified Users */}
                <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
                    <h3 className="text-lg font-semibold">Verified Users</h3>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold">{verifiedUsers}</span>
                        <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                    </div>
                </Card>

                  {/* Card 3: Total Posts */}
                  <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
                    <h3 className="text-lg font-semibold">Total Posts</h3>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold">{postCount}</span>
                        <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                    </div>
                </Card>

                {/* Card 4: Total Revenue */}
                <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold">${totalRevenue}</span>
                        <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                    </div>
                </Card>
                
            </div>

            {/* Chart Section */}
            <div className="w-full mt-10">
                <Card className="p-6 bg-default-200 rounded-lg shadow-md hover:shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
                    <div className="w-full h-64 md:h-96">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;