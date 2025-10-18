// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    // min-h-[calc(100vh-64px)]는 헤더 높이를 제외한 전체 화면 높이를 차지하게 합니다.
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center bg-gray-50">
      <div className="max-w-3xl w-full">
        {/* 타이틀 및 소개 */}
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 animate-fadeIn">
          황인성의 포트폴리오
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fadeIn delay-100">
          visual studio를 사용한 웹계발
        </p>

        {/* 핵심 섹션 카드 (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          
          {/* Projects Link (GitHub 연동 페이지) */}
          <Link href="/repos" className="block p-6 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold mb-2">💻 PROJECTS</h2>
            <p>실제 GitHub 리포지토리를 통해 프로젝트를 확인하세요.</p>
          </Link>
          
          {/* About/Bio Link (페이지 내 스크롤) */}
          <a href="/dashboard-c" className="block p-6 bg-white border border-gray-200 text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold mb-2">🧑‍💻 ABOUT ME</h2>
            <p>다른 프로젝르와 관련 정보</p>
          </a>

          {/* Contact Link (이메일 연결) */}
          <a href="mailto:example@email.com" className="block p-6 bg-white border border-gray-200 text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold mb-2">📧 CONTACT</h2>
            <p>이메일 github 주소</p>
          </a>
        </div>
        
        {/* About Me Section (페이지 내 상세 정보) */}
        <section id="about" className="mt-20 pt-8 border-t border-gray-200 text-left bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Me & Skills</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            황인성의 자기소개 포트폴리오 사이트입니다. 
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">주요 기술 스택</h3>
          <ul className="flex flex-wrap gap-2 text-sm">
            {['Next.js (App Router)', 'React', 'TypeScript', 'Tailwind CSS', 'Clerk (Auth)', 'Git/GitHub', 'Vercel', 'Node.js/Express'].map(skill => (
              <li key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium shadow-sm">
                {skill}
              </li>
            ))}
          </ul>
        </section>
        
      </div>
    </div>
  )
}
