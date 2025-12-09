import Link from 'next/link'

// 1. 타입 정의
interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
}

async function getPosts(): Promise<Post[]> {
  // [경고] 192.168... IP는 Vercel 배포 환경에서 접속 불가능합니다.
  // 실제 배포 시에는 공인 IP나 도메인이 필요합니다.
  try {
    const res = await fetch(
      'http://192.168.23.128/wordpress/wp-json/wp/v2/posts',
      {
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      // 에러가 나면 콘솔에만 출력하고 빈 배열 반환 (페이지 멈춤 방지)
      console.error('Wordpress fetch failed:', res.statusText);
      return [];
    }

    return res.json()
  } catch (error) {
    console.error('Network error:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">내 워드프레스 블로그</h1>
      
      {posts.length === 0 ? (
        <div className="text-red-500 border p-4 rounded">
          <p>데이터를 불러올 수 없습니다.</p>
          <p className="text-sm text-gray-500 mt-1">
            (서버가 꺼져있거나, 로컬 IP 192.168.x.x에 Vercel이 접근할 수 없습니다)
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
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
      )}
    </div>
  )
}
