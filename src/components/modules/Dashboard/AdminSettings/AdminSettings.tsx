"use client"
import React from 'react'
import ProfileSettingForm from '../ProfileSettingForm/ProfileSettingForm'
import PageTitle from '@/src/components/PageTitle/PageTitle'


const AdminSettings = () => {
  return (
    <>
        <PageTitle heading='Settings' subHeading='Admin Profile setting'/>
        <ProfileSettingForm />
        
    </>
  )
}

export default AdminSettings