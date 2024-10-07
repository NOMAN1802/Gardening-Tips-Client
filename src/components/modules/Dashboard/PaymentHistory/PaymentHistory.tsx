"use client"
import Container from '@/src/components/Container/Container'
import Loading from '@/src/components/Loading/Loading'
import PageTitle from '@/src/components/PageTitle/PageTitle'
import { usePaymentHistory } from '@/src/hooks/payment.hook'
import { Avatar } from '@nextui-org/avatar'
import { Chip } from '@nextui-org/chip'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import React from 'react'

const paymenttHistory = () => {

    const {data,isLoading} = usePaymentHistory();
    console.log(data?.data)
    const paymentts = data?.data;
  return (
    <Container>
    <PageTitle heading="paymentt History" subHeading="paymentt list of verified payments" />
    <div className="w-full overflow-x-auto">
      {isLoading ? (
        <Loading />
      ) : paymentts?.length ? (
        <>
          <Table aria-label="All payments" className="min-w-full">
            <TableHeader>
              <TableColumn className="hidden md:table-cell">IMAGE</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn className="hidden md:table-cell">EMAIL</TableColumn>
              <TableColumn className="hidden lg:table-cell">ID</TableColumn>
              <TableColumn className="hidden lg:table-cell">STATUS</TableColumn>
              
            </TableHeader>
            <TableBody>
              {paymentts?.map((payment: any) => (
                <TableRow key={payment?._id}>
                  <TableCell className="hidden md:table-cell">
                    <Avatar src={payment?.userId?.profilePhoto} 
                    alt={payment?.name} className="w-10 h-10" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{payment?.userId?.name}</span>
                      <span className="text-sm text-default-500 md:hidden">{payment?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{payment?.userId?.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Chip color='success' size="sm">
                    {payment?.transactionId }
                    </Chip>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Chip color='default' size="sm">
                    {payment.userId.mobileNumber}
                    </Chip>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <p className="text-center py-4">No payments found!!!</p>
      )}
    </div>
  </Container>
  )
}

export default paymenttHistory