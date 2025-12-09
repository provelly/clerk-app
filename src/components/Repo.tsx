import Link from 'next/link';
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa';

// 1. 저장소 데이터의 타입을 정의합니다 (any 제거)
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
}

// 2. 데이터를 가져오는 함수 (안전 장치 추가됨)
async function fetchRepos(username: string) {
  // 60초마다 데이터 갱신 (ISR)
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      next: {
        revalidate: 60, 
      },
    }
  );

  // API가 실패하거나, 없는 유저이거나, 제한이 걸렸을 때 처리
  if (!response.ok) {
    console.error('GitHub API Error:', response.status, response.statusText);
    // 에러가 나면 빈 배열을 반환해서 .filter()에서 안 터지게 함
    return [];
  }

  const data = await response.json();

  // 데이터가 진짜 배열인지 한 번 더 확인 (가장 중요!)
  if (!Array.isArray(data)) {
    console.error('API Error: Data is not an array', data);
    return [];
  }

  return data;
}

// 3. 컴포넌트 메인
const Repo = async ({ username }: { username: string }) => {
  // 함수 실행
  const repos = await fetchRepos(username);

  // ★ 에러 방지 핵심: repos가 배열일 때만 filter 실행
  // (API에서 에러가 나면 빈 배열이 오므로 안전함)
  const nonForkRepos = repos.filter((repo: any) => !repo.fork);

  // 최근 업데이트 순이나 별점 순으로 정렬하고 싶다면 아래 주석 해제
  // nonForkRepos.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">최근 저장소</h2>
      
      {/* 데이터가 없을 경우 안내 메시지 */}
      {nonForkRepos.length === 0 ? (
        <p className="text-gray-500">
          표시할 저장소가 없거나, GitHub API 한도를 초과했습니다.
        </p>
      ) : (
        <ul>
          {nonForkRepos.map((repo: Repo) => (
            <li key={repo.id} className="bg-white p-4 rounded-lg shadow mb-4 hover:bg-gray-50 transition">
              <Link href={repo.html_url} target="_blank">
                <h3 className="text-xl font-bold mb-2">{repo.name}</h3>
                <p className="text-gray-600 mb-4 truncate">
                  {repo.description || '설명이 없습니다.'}
                </p>
                <div className="flex gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch className="text-blue-500" /> {repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye className="text-green-500" /> {repo.watchers_count}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Repo;
