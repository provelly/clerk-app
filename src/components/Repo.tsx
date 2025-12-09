import Link from 'next/link';
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa';

// 1. 타입 정의
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  fork: boolean;
}

// 2. 데이터 가져오기
async function fetchRepos(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error('GitHub API Error:', response.status);
      return [];
    }

    const data = await response.json();

    // ★ 가장 중요: 데이터가 배열인지 확인
    if (!Array.isArray(data)) {
      console.error('API Error: Data is not an array', data);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

const Repo = async ({ username }: { username: string }) => {
  const repos = await fetchRepos(username);

  // 배열일 때만 filter 실행
  const nonForkRepos = Array.isArray(repos) 
    ? repos.filter((repo: Repo) => !repo.fork) 
    : [];

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">최근 저장소</h2>
      {nonForkRepos.length === 0 ? (
        <p className="text-gray-500">
          표시할 저장소가 없습니다. (GitHub API 제한 확인 필요)
        </p>
      ) : (
        <div className="grid gap-4">
          {nonForkRepos.map((repo: Repo) => (
            <div key={repo.id} className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition">
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
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Repo;
