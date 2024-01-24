'use server';

import { LoadMore } from '@/components/LoadMore';
import { getPosts, loadMorePost } from '@/components/loadMorePost';
import { MusicCard } from './ui/MusicCard';

export const MusicCardList = async () => {
  const postsResult = await getPosts(0);
  if (postsResult.isFailure()) {
    return <div>投稿がありません</div>;
  }
  // TODO initialOffsetをハードコードしない

  return (
    <LoadMore loadMoreAction={loadMorePost} initialOffset={10}>
      <div className="space-y-4 mx-auto">
        {postsResult.value.map((post, index) => (
          <MusicCard post={post} key={index} />
        ))}
      </div>
    </LoadMore>
  );
};
