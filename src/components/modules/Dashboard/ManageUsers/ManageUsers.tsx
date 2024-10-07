"use client";

import Container from '@/src/components/Container/Container';
import Loading from '@/src/components/Loading/Loading';
import PageTitle from '@/src/components/PageTitle/PageTitle';
import { useUser } from '@/src/context/user.provider';
import { useGetUsers, useChangeUserStatus } from '@/src/hooks/user.hook'; // Import your hook
import { IUser } from '@/src/types';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Tooltip } from '@nextui-org/tooltip';
import React, { useMemo, useState } from 'react';
import { FaClipboardCheck } from 'react-icons/fa';
import { MdOutlineAppBlocking } from 'react-icons/md';

const ManageUsers = () => {
  const [selectedPost, setSelectedPost] = useState<IUser | null>(null);
  const { data: usersData, isLoading, refetch } = useGetUsers();
  const { user } = useUser();
  const { currentUserData, otherUsers } = useMemo(() => {
    if (!usersData || !user) return { currentUserData: null, otherUsers: [] };

    const currentUser = usersData.data.find((u: IUser) => u._id === user?._id);
    const others = usersData?.data?.filter((u: IUser) => u._id !== user?._id);

    return { currentUserData: currentUser, otherUsers: others };
  }, [usersData, user]);

  // Use your change user status hook
  const { mutate: changeStatus, isPending } = useChangeUserStatus();

  // Update handleStatusChange to trigger the status change mutation
  const handleStatusChange = (user: IUser) => {
    const newStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'; 
    changeStatus({ userId: user._id, status: newStatus }, {
      onSuccess: () => {
        setSelectedPost(null);
        refetch(); 
      }
    });
  };

  if (isLoading || !user || !currentUserData) {
    return (
      <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-default-500" />
      </div>
    );
  }

  return (
    <Container>
      <PageTitle heading="Manage Users" subHeading="Admin User Management" />
      <div className="w-full overflow-x-auto">
        {isLoading ? (
          <Loading />
        ) : otherUsers?.length ? (
          <>
            <Table aria-label="All Users" className="min-w-full">
              <TableHeader>
                <TableColumn className="hidden md:table-cell">IMAGE</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn className="hidden md:table-cell">EMAIL</TableColumn>
                <TableColumn className="hidden lg:table-cell">VERIFIED</TableColumn>
                <TableColumn className="hidden lg:table-cell">STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {otherUsers?.map((user: IUser) => (
                  <TableRow key={user?._id}>
                    <TableCell className="hidden md:table-cell">
                      <Avatar src={user?.profilePhoto} alt={user?.name} className="w-10 h-10" />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">{user?.name}</span>
                        <span className="text-sm text-default-500 md:hidden">{user?.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{user?.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Chip color={user.isVerified ? 'success' : 'default'} size="sm">
                        {user.isVerified ? 'Verified' : 'Regular'}
                      </Chip>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Chip color={user.status === 'ACTIVE' ? 'success' : 'default'} size="sm">
                        {user.status === 'ACTIVE' ? 'ACTIVE' : 'BLOCKED'}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Tooltip content="Block User">
                          <Button
                            isIconOnly
                            size="lg"
                            variant="light"
                            onPress={() => handleStatusChange(user)}
                            isDisabled={isPending} 
                          >
                            <MdOutlineAppBlocking className="text-red-500" />
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <p className="text-center py-4">No Users found!!!</p>
        )}
      </div>
    </Container>
  );
};

export default ManageUsers;
