import Link from 'next/link'

// 1. 워드프레스에서 글 데이터를 가져오는 함수
async function getPosts() {
  // ★ 아래 주소를 본인 서버 IP로 꼭 바꾸세요!
  const res = await fetch(
    'http://192.168.23.128/wordpress/wp-json/wp/v2/posts',
    {
      cache: 'no-store', // 새 글을 쓰면 바로바로 갱신되게 설정
    }
  )

  if (!res.ok) {
    throw new Error('데이터를 가져오는데 실패했습니다.')
  }

  return res.json()
}

// 2. 실제 화면을 그리는 컴포넌트
export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">내 워드프레스 블로그</h1>
      <div className="grid gap-4">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="border p-4 rounded shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-bold">
              {/* 제목 가져오기 */}
              {post.title.rendered}
            </h2>
            <div
              // 본문 요약 가져오기 (HTML 태그 제거 필요할 수 있음)
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              className="text-gray-600 mt-2"
            />
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-500 mt-2 inline-block"
            >
              더 읽기 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
