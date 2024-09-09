// app/post/[id]/page.tsx
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation'; // use this instead of next/router

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

const PostPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const response = await fetch(`http://localhost:3000/api/posts/fetch?id=${id}`);
  if (!response.ok) {
    notFound(); // Handle the case where the post is not found
    return;
  }

  const post: BlogPost = await response.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="mt-4">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostPage;