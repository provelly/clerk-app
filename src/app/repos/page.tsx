import Repo from '@/components/Repo'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default function ReposPage() {
  // 본인의 GitHub 아이디로 변경하세요
  const username = 'provelly';

  return (
    <div className='p-4 container mx-auto'>
      <h1 className="text-3xl font-bold mb-6">내 GitHub 저장소 목록</h1>
      <Suspense fallback={<div>Loading repositories...</div>}>
        <Repo username={username} />
      </Suspense>
    </div>
  )
}
