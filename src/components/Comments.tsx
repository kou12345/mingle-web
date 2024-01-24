'use server';

import { commentFormAction } from '@/actions/commentFormAction';
import { db } from '@/server/db';
import { Failure, Result, Success } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { profiles } from 'drizzle/schema';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Suspense } from 'react';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

type Props = {
  postId: string;
};

export const Comments = async (props: Props) => {
  // ログイン中のユーザー情報を取得する
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ログインしていない場合の処理
  if (!user) {
    return (
      <div>
        <div className="font-bold">Comment</div>

        {/* 別のUIを出したい */}
        {/* <div className="flex">
        <Image
          className="rounded-full w-14 h-14 object-cover"
          src={avatarUrl.value}
          alt="icon"
          width={100}
          height={100}
          priority={true}
        />
        <CommentForm formAction={commentFormActionWithPostIdAndUserId} />
      </div> */}
        <Suspense fallback={<div>Loading...</div>}>
          <CommentList postId={props.postId} />
        </Suspense>
      </div>
    );
  }

  // 以下、ログイン中のユーザーがいる場合の処理
  console.log('hogehoge');

  const commentFormActionWithPostIdAndUserId = commentFormAction.bind(
    null,
    props.postId,
    user?.id,
  );

  const avatarUrl = await getLoggedInUserAvatarUrl(user?.id);
  if (avatarUrl.isFailure()) {
    console.log('avatarUrl.isFailure()');
    // TODO 要修正
    // avatarUrlが取得できなかった場合には,iconの表示画像をデフォルトのものにするのが良さげ？
    return <div>avatarUrlが取得できませんでした</div>;
  }

  return (
    <div>
      <div className="font-bold">Comment</div>

      <div className="flex">
        <Image
          className="rounded-full w-14 h-14 object-cover"
          src={avatarUrl.value}
          alt="icon"
          width={100}
          height={100}
          priority={true}
        />
        <CommentForm formAction={commentFormActionWithPostIdAndUserId} />
      </div>
      <CommentList postId={props.postId} />
    </div>
  );
};

const getLoggedInUserAvatarUrl = async (
  userId: string,
): Promise<Result<string, Error>> => {
  try {
    const result = await db
      .select({
        avatarUrl: profiles.avatarUrl,
      })
      .from(profiles)
      .where(eq(profiles.id, userId));

    return new Success(result[0].avatarUrl);
  } catch (error) {
    console.error(error);
    return new Failure(error as Error);
  }
};
