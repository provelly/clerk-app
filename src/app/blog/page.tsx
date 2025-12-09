import Link from 'next/link'

// 1. Post 데이터의 구조(타입)를 정의합니다.
// 이렇게 하면 'any'를 쓰지 않아도 되고, 자동완성 기능도 좋아집니다.
interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
}

// 2. 워드프레스에서 글 데이터를 가져오는 함수
async function getPosts(): Promise<Post[]> {
  // ★ [주의] Vercel 배포 시 192.168... 같은 내부 IP는 접속이 불가능할 수 있습니다.
  // 외부에서 접속 가능한 도메인이나 공인 IP가 필요합니다.
  const res = await fetch(
    'http://192.168.23.128/wordpress/wp-json/wp/v2/posts',
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    // 에러 처리: 데이터 가져오기 실패 시 빈 배열 반환 혹은 에러 던지기
    // 여기서는 빌드 오류를 방지하기 위해 에러를 던지지만, 실제 서비스에선 예외 처리가 중요합니다.
    throw new Error('데이터를 가져오는데 실패했습니다.')
  }

  return res.json()
}

// 3. 실제 화면을 그리는 컴포넌트
export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">내 워드프레스 블로그</h1>
      <div className="grid gap-4">
        {/* 여기서 post: any 대신 post: Post 타입을 사용합니다 */}
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className="border p-4 rounded shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-bold">
              {post.title.rendered}
            </h2>
            <div
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
