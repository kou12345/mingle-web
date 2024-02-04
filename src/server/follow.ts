import { Transaction } from '@/types/types';
import { and, eq } from 'drizzle-orm';
import { follows, profiles, users } from 'drizzle/schema';
import 'server-only';
import { db } from './db';

type FollowUser = {
  userId: string;
  userName: string;
  displayName: string;
  avatarUrl: string;
  followedAt: Date;
};

// UserIdを元にfollow一覧を取得する
export const getFollowListByUserId = async (
  userId: string,
): Promise<FollowUser[]> => {
  let followUsers: FollowUser[] = [];
  try {
    // TODO 無限スクロール 引数にoffsetとlimitを追加する
    // 一旦、limitで10件取得する
    followUsers = await db
      .select({
        userId: follows.followingUserId,
        userName: users.userName,
        displayName: profiles.displayName,
        avatarUrl: profiles.avatarUrl,
        followedAt: follows.createdAt,
      })
      .from(follows)
      .where(eq(follows.userId, userId))
      .limit(10)
      .innerJoin(users, eq(follows.followingUserId, users.id))
      .innerJoin(profiles, eq(follows.followingUserId, profiles.id));
  } catch (error) {
    // TOOD エラーハンドリング
    if (error instanceof Error) {
      console.log(error);
      throw new Error('フォロー一覧を取得できませんでした。');
    }
  }

  return followUsers;
};

// 特定のユーザーがフォローしているかどうかを取得する
export const getIsFollowing = async ({
  tx,
  followerId,
  targetUserName,
}: {
  tx?: Transaction;
  followerId: string;
  targetUserName: string;
}): Promise<boolean> => {
  let isFollowing = false;
  try {
    // フォロー対象のユーザーIDを取得する
    const targetUserId = await (db || tx)
      .select({ id: users.id })
      .from(users)
      .where(eq(users.userName, targetUserName));

    // フォローしているかどうかを取得する
    const result = await (db || tx)
      .select({ id: follows.id })
      .from(follows)
      .where(
        and(
          eq(follows.userId, followerId),
          eq(follows.followingUserId, targetUserId[0].id),
        ),
      );

    // resultが存在する場合はフォローしている
    if (result.length > 0) {
      isFollowing = true;
    }
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: フォロー情報を取得できませんでした。');
  }

  return isFollowing;
};

// フォローする
export const follow = async ({
  tx,
  followerId,
  targetUserId,
}: {
  tx?: Transaction;
  followerId: string;
  targetUserId: string;
}) => {
  try {
    await (db || tx).insert(follows).values({
      userId: followerId,
      followingUserId: targetUserId,
    });
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: フォローできませんでした。');
  }
};

// フォローを解除する
export const unFollow = async ({
  tx,
  followerId,
  targetUserId,
}: {
  tx?: Transaction;
  followerId: string;
  targetUserId: string;
}): Promise<void> => {
  try {
    await (db || tx)
      .delete(follows)
      .where(
        and(
          eq(follows.userId, followerId),
          eq(follows.followingUserId, targetUserId),
        ),
      );
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: フォローを解除できませんでした。');
  }
};
