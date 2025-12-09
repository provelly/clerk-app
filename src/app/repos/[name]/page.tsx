import RepoDirs from '@/components/RepoDirs'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default function RepoDetailPage({ params }: { params: { name: string } }) {
  const { name } = params;

  return (
    <div className='flex flex-col justify-start items-start max-w-lg p-4'>
      <Link
        href='/repos'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
      >
        Back to Repositories
      </Link>
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Repository: {name}</h2>
        <Suspense fallback={<div>Loading directories...</div>}>
          <RepoDirs name={name} />
        </Suspense>
      </div>
    </div>
  )
}
