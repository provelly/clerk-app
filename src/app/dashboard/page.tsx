// src/app/dashboard/page.tsx
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage () {
  const { isAuthenticated }= await auth()

  if( !isAuthenticated ) {
    return <div>sign in to view this page</div>
  }
  const user=await currentUser()
  console.log(user )
  
  // 이전 단계에서 일관성 있게 사용된 GitHub 사용자 이름
  const githubUsername = 'provelly'; 

  return (
    // 중앙 정렬 및 카드 스타일 적용
    <div className="flex justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 space-y-6 border border-blue-300">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 border-b-4 border-blue-500 pb-3">
          연락처
        </h1>
        
        <div className="space-y-4">
          
          {/* 사용자 이름 */}
          <div className="flex items-center text-xl">
            <span className="font-bold text-blue-600 w-24">👤 이름:</span>
            <span className='text-gray-800'>
              황인성
            </span>
          </div>

          {/* 이메일 주소 */}
          <div className="flex items-center text-xl">
            <span className="font-bold text-blue-600 w-24"> 이메일:</span>
            <a 
              href={`mailto:${user?.primaryEmailAddress?.emailAddress}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-blue-500 underline break-all"
            >
              {user?.primaryEmailAddress?.emailAddress}
            </a>
          </div>

          {/* GitHub 주소 */}
          <div className="flex items-center text-xl">
            <span className="font-bold text-blue-600 w-24"> GitHub:</span>
            <a 
              href={`https://github.com/${githubUsername}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-blue-500 underline break-all"
            >
              https://github.com/{githubUsername}
            </a>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 pt-4 border-t mt-6 text-center">
          이 페이지는 서버 측 렌더링(Server-side Rendering)을 사용합니다.
        </p>
      </div>
    </div>
  )
}
