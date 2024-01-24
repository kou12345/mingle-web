'use server';

import { FollowButton } from '@/components/FollowButton';
import { db } from '@/server/db';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { follows, profiles, users } from 'drizzle/schema';
import { cookies } from 'next/headers';
import Image from 'next/image';

/*
TODO
フォロー解除をしたら、revalidatePathが実行されるため、フォロー解除したユーザーが表示されなくなる
*/

export const FollowList = async () => {
  // ログインしているユーザーのIDを取得
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user?.id);
  // ログインしているユーザーがフォローしているユーザーを取得
  const followList = await getFollowList(user?.id as string);
  return (
    <div>
      {followList.map((follow, index) => (
        <div key={index} className="flex">
          <div>{follow.displayName}</div>
          <Image
            className="rounded-full w-14 h-14 object-cover"
            src={follow.avatarUrl}
            alt="icon"
            width={100}
            height={100}
            priority={true}
          />
          <FollowButton userName={follow.userName} isFollowing={true} />
        </div>
      ))}
    </div>
  );
};

const getFollowList = async (userId: string) => {
  try {
    const result = await db
      .select({
        userId: follows.followingUserId,
        userName: users.userName,
        displayName: profiles.displayName,
        avatarUrl: profiles.avatarUrl,
      })
      .from(follows)
      .where(eq(follows.userId, userId))
      .innerJoin(profiles, eq(follows.followingUserId, profiles.id))
      .innerJoin(users, eq(profiles.id, users.id));

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
