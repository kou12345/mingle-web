import { Transaction } from '@/types/types';
import { and, eq } from 'drizzle-orm';
import { likes } from 'drizzle/schema';
import 'server-only';
import { db } from './db';

// すでにいいねしているか確認する
export const checkPostLikedByUser = async ({
  tx,
  postId,
  userId,
}: {
  tx?: Transaction;
  postId: string;
  userId: string;
}): Promise<boolean> => {
  console.log('START: checkPostLikedByUser');
  try {
    const result = await (tx || db)
      .select({ id: likes.id })
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));

    console.log('result: ', result);

    if (result.length > 0) {
      console.log('END: checkPostLikedByUser');

      return true;
    }
    console.log('END: checkPostLikedByUser');
    return false;
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: いいね情報を取得できませんでした。');
  }
};

// いいねをする
export const likePost = async ({
  tx,
  postId,
  userId,
}: {
  tx?: Transaction;
  postId: string;
  userId: string;
}): Promise<void> => {
  console.log('like');
  console.log('実行日時: ', new Date());
  try {
    await (tx || db).insert(likes).values({
      postId,
      userId,
    });
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: いいねをすることができませんでした。');
  }
};

// いいねを解除する
export const dislikePost = async ({
  tx,
  postId,
  userId,
}: {
  tx?: Transaction;
  postId: string;
  userId: string;
}): Promise<void> => {
  console.log('unLike');
  console.log('実行日時: ', new Date());
  try {
    await (tx || db)
      .delete(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: いいねを解除できませんでした。');
  }
};
