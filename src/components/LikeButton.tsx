'use client';

import { likePostAction } from '@/actions/likeButton';
import { User } from '@/types/types';
import { Like } from '@public/like';
import { Liked } from '@public/liked';
import { useRouter } from 'next/navigation';
import { useEffect, useOptimistic, useState, useTransition } from 'react';
import { Session } from 'inspector';

type Data = {
  session: Session | null;
};

type Props = {
  postId: string;
  isLiked: boolean;
  data?: Data
};

export const LikeButton = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [optimisticLikes, changeOptimisticLikes] = useOptimistic(
    props.isLiked, // 初期値 true
    (prev) => !prev, // 更新関数
  );

  useEffect(() => {
    console.log(props.data?.session)
  },[props.data])

  return (
    <div>
      <button
        onClick={() =>
          startTransition(async () => {
            if(props.data?.session === null || props.data?.session === undefined) {
              router.push("/login")
            } else {
              changeOptimisticLikes(props.isLiked);
              await likePostAction(props.postId);
            }
          })
        }
      >
        {optimisticLikes ? <Liked /> : <Like />}
      </button>
      {/* <div>{optimisticLikes ? <Liked /> : <Like />}</div> */}
    </div>
  );
};
