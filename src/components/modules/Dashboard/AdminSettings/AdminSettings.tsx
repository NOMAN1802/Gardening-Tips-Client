"use client"
import React from 'react'
import ProfileSettingForm from '../ProfileSettingForm/ProfileSettingForm'
import { FieldValues } from 'react-hook-form'
import Container from '@/src/components/Container/Container'
import PageTitle from '@/src/components/PageTitle/PageTitle'

const AdminSettings = () => {
  return (
    <Container>
        <PageTitle heading='Settings' subHeading='Admin Profile setting'/>
        <ProfileSettingForm />
    </Container>
  )
}

export default AdminSettings