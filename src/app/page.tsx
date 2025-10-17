// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    // min-h-[calc(100vh-64px)]는 헤더 높이를 제외한 전체 화면 높이를 차지하게 합니다.
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center bg-gray-50">
      <div className="max-w-3xl w-full">
        {/* 타이틀 및 소개 */}
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 animate-fadeIn">
          👋 안녕하세요, [사용자 이름]입니다
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fadeIn delay-100">
          Next.js와 TypeScript를 주력으로 사용하는 프론트엔드 개발자입니다.
        </p>

        {/* 핵심 섹션 카드 (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          
          {/* Projects Link (GitHub 연동 페이지) */}
          <Link href="/repos" className="block p-6 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold mb-2">💻 PROJECTS</h2>
            <p>실제 GitHub 리포지토리를 통해 프로젝트를 확인하세요.</p>
          </Link>
          
          {/* About/Bio Link (페이지 내 스크롤) */}
          <a href="#about" className="block p-6 bg-white border border-gray-200 text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold mb-2">🧑‍💻 ABOUT ME</h2>
            <p>기술 스택, 경험 및 상세 경력 정보</p>
          </a>

          {/* Contact Link (이메일 연결) */}
          <a href="mailto:example@email.com" className="block p-6 bg-white border border-gray-200 text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold mb-2">📧 CONTACT</h2>
            <p>이메일로 연락 주시면 빠르게 회신 드리겠습니다.</p>
          </a>
        </div>
        
        {/* About Me Section (페이지 내 상세 정보) */}
        <section id="about" className="mt-20 pt-8 border-t border-gray-200 text-left bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Me & Skills</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            저는 웹 성능 최적화와 직관적인 사용자 경험(UX) 구현에 열정을 가진 개발자입니다. 복잡한 문제를 간단하고 확장 가능한 솔루션으로 해결하는 것을 목표로 하며, 새로운 기술 습득에 적극적입니다.
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
  );
}
