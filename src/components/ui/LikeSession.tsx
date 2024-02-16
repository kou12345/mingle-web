"use client"
import React from 'react';
import { LikeButton } from '../LikeButton';
import { SessionProvider, useSession } from 'next-auth/react';

type Props = {
  postId: string;
  isLiked: boolean;
  cookie: string;
};

export const LikeSession = (props: Props) => {
  const { data: session } = useSession(); // セッション情報を取得する

  console.log(session);
  return (
    <SessionProvider>
      <LikeButton
        postId={props.postId}
        isLiked={props.isLiked}
        cookie={props.cookie}
      />
    </SessionProvider>
  );
};
