import { Repository } from '@/types/repo'
import { Token } from '@clerk/nextjs/server'
import Link from 'next/link'
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'

const username = 'provelly'

export default async function ReposPage() {
  // 1. SSG: Static Site Generation
  const response = await fetch(`https://api.github.com/users/${username}/repos`,
  {
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  }
  )
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const repos = await response.json()
  // console.log(repos)

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>
        Github Repositories of {username}
      </h2>
      <ul>
        {repos.map((repo: Repository) => (
          <li key={repo.id} className='bg-gray-100 m-4 p-4 rounded-md'>
            <Link href={`/repos/${repo.name}`}>
              <h3 className='text-xl font-bold'>{repo.name}</h3>
              <p>{repo.description}</p>
              <div className='flex justify-between items-center'>
                <span className='flex items-center gap-1'>
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className='flex items-center gap-1'>
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className='flex items-center gap-1'>
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}