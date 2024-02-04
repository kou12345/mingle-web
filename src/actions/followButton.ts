'use server';

import { db } from '@/server/db';
import { follow, getIsFollowing, unFollow } from '@/server/follow';
import { getUserIdByUserName } from '@/server/user';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// TODO revalidatePath('/');が正しいか確認する
export async function followButtonAction(
  userName: string,
): Promise<{ followed: boolean; error: boolean }> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // ログイン中のユーザーを取得する
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('ログインしてください');
    throw new Error('ERROR: ログインしてください');
  }

  try {
    // TODO ここでは関数を呼ぶのみで、transactionは呼ばない方が良いかも
    return await db.transaction(async (tx) => {
      // フォロー対象のuserIdを取得する
      const targetUserId = await getUserIdByUserName({
        tx,
        userName,
      });

      // すでにfollowをしているかどうかを確認する
      const isFollowing = await getIsFollowing({
        tx,
        followerId: user.id,
        targetUserName: userName,
      });

      if (isFollowing) {
        console.log('LOG: フォローを解除する');
        // followを解除する
        await unFollow({
          tx,
          followerId: user.id,
          targetUserId,
        });

        revalidatePath('/');

        return { followed: false, error: false };
      } else {
        // followをする
        console.log('LOG: フォローをする');
        await follow({
          tx,
          followerId: user.id,
          targetUserId,
        });

        revalidatePath('/');

        return { followed: true, error: false };
      }
    });
  } catch (error) {
    console.log(error);
    revalidatePath('/');
    return { followed: false, error: true };
  }
}
