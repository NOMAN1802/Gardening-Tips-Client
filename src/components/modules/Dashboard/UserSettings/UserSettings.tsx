"use client"
import PageTitle from '@/src/components/PageTitle/PageTitle'
import React from 'react'
import ProfileSettingForm from '../ProfileSettingForm/ProfileSettingForm'

const UserSettings = () => {
  return (
    <>
    <PageTitle heading='Settings' subHeading='Admin Profile setting'/>
    <ProfileSettingForm />
    </>
  )
}

export default UserSettings