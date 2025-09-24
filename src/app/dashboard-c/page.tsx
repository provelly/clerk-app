'use client'
import { useUser } from '@clerk/nextjs'
import { ClientPageRoot } from 'next/dist/client/components/client-page'
import React from 'react'

export default function DashboardCPage() {

  const{ isSignedIn,user, isLoaded } = useUser()

  if(!isLoaded) {
  return <div>Loading... </div>
  }

  if(!isSignedIn) {
    return (
    <div>sign in to view this page </div>
    )
  }

  return (
    <div>
      <h1 className='text-2x1 font-bold mb-5'>Dashboard(Client-side) </h1>
      <div className='mb-5'>
        <p>use client 지시자 사용함 </p>
        <p>브라우저에서 useUser() 함수 이용</p>
        <p>Welcome, {user?.firstName}!</p>
        <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>

      </div>

    </div>
  )
}
