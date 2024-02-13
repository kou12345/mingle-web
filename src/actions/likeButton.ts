'use server';

import { db } from '@/server/db';
import { checkPostLikedByUser, dislikePost, likePost } from '@/server/like';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function likePostAction(
  postId: string,
): Promise<{ liked: boolean; error: boolean }> {
  console.log('postId: ', postId);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // ログイン中のユーザーを取得する
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // TODO 未ログインの場合とcatchのエラーでメッセージを分けたい
    console.log('ログインしてください');
    revalidatePath('/');
    return { liked: false, error: true };
  }

  try {
    return await db.transaction(async (tx) => {
      if (await checkPostLikedByUser({ tx, postId, userId: user.id })) {
        // すでにいいねをしているため、いいねを解除する
        console.log('LOG: いいねを解除する');
        await dislikePost({ tx, postId, userId: user.id });

        revalidatePath('/');

        return { liked: false, error: false };
      } else {
        // いいねをする
        console.log('LOG: いいねをする');
        await likePost({ tx, postId, userId: user.id });

        revalidatePath('/');

        return { liked: true, error: false };
      }
    });
  } catch (error) {
    console.log(error);
    revalidatePath('/');

    return { liked: false, error: true };
  }
}

/*
リロードしてから、いいねすると正しい挙動になる
リロードせずにいいねを押しても、更新されない

followButtonはリロードしない場合でも、正しい挙動になる

いいねの解除ができていない

???????????????
*/
