'use client';

import { likePostAction } from '@/actions/likeButton';
import { Like } from '@public/like';
import { useOptimistic, useTransition } from 'react';

type Props = {
  postId: string;
  isLiked: boolean;
};

export const LikeButton = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  const [optimisticLikes, changeOptimisticLikes] = useOptimistic(
    props.isLiked, // 初期値 true
    (prev) => !prev, // 更新関数
  );

  return (
    <div>
      <button
        onClick={() =>
          startTransition(async () => {
            changeOptimisticLikes(props.isLiked);
            await likePostAction(props.postId);
          })
        }
      >
        {isPending ? 'loading...' : <Like />}
      </button>
      <div>{optimisticLikes ? 'いいねした' : 'いいねする'}</div>
    </div>
  );
};
