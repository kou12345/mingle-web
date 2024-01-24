'use client';

import { followButtonAction } from '@/actions/followButton';
import { useOptimistic, useTransition } from 'react';

type Props = {
  userName: string;
  isFollowing: boolean;
};

export const FollowButton = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  const [optimisticLikes, changeOptimisticLikes] = useOptimistic(
    props.isFollowing,
    (prev) => !prev,
  );

  // TODO フォロー済みだった場合、buttonにカーソルを合わせたら、buttonのテキストが「フォロー解除」になると良いかも

  return (
    <div>
      <button
        onClick={() =>
          startTransition(async () => {
            changeOptimisticLikes(props.isFollowing);
            await followButtonAction(props.userName);
          })
        }
        className="text-[#DDBFAE] bg-[#646767] w-16 h-8 rounded-md font-bold text-[12px]"
      >
        {isPending ? 'loading...' : optimisticLikes ? 'following' : 'follow'}
      </button>
    </div>
  );
};
