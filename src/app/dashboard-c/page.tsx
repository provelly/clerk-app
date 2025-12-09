'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

export default function DashboardCPage() {
  // 수정: 사용하지 않는 'user' 제거
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading... </div>
  }

  if (!isSignedIn) {
    return <div>sign in to view this page </div>
  }

  // Project data array for easy mapping
  const projects = [
    { name: 'Assign 1 Project', url: 'https://92213172.vercel.app/' },
    { name: 'Assign 2 Project', url: 'https://assign2-umber.vercel.app/' },
    { name: 'Assign 3 Project', url: 'https://assign3-neon.vercel.app/' },
  ];

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-extrabold text-blue-800 mb-6 text-center border-b-4 border-blue-500 pb-3'>
        about-me
      </h1>
      
      {/* User Info Section */}
      <div className='bg-blue-50 p-6 rounded-xl shadow-md mb-8 border border-blue-200'>
        <h2 className='text-2xl font-bold mb-4 text-blue-700'>
          황인성
        </h2>
        <p className='text-gray-700 mb-1'>학번: 92213172</p>
        <p className='text-gray-700 mb-1'>중부대학교 재학생</p>
        <p className='text-gray-700 mb-1'>생년월일: 2003/12/12</p>
      </div>

      {/* Projects Section */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold text-blue-800 mb-4'>
          🚀 포트폴리오 프로젝트 소개
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-[1.02] duration-200 text-center font-medium"
            >
              <span className="block text-lg">{project.name}</span>
              <span className="block text-xs opacity-80 mt-1">바로가기: {new URL(project.url).hostname}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
