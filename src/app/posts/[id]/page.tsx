'use server';

import { Comments } from '@/components/Comments';
import { MusicPlayerSection } from '@/components/MusicPlayerSection';
import { Search } from '@/components/ui/Search';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { posts } from 'drizzle/schema';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // postIdを使って、データ取得する
  const post = await getPostByPostId(id);

  if (post === null) {
    // TODO エラーページとかに飛ばす
    return <div>投稿がありません</div>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <div className="my-6 ml-auto w-fit">
        <Search />
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <MusicPlayerSection postId={id} />
        </Suspense>

        <hr />
        <Suspense fallback={<div>Loading...</div>}>
          <Comments postId={id} />
        </Suspense>
      </div>
    </div>
  );
}

// postIdを使って、データ取得する
// todo 返り値の型を定義する
const getPostByPostId = async (postId: string) => {
  try {
    const result = await db.select().from(posts).where(eq(posts.id, postId));

    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
