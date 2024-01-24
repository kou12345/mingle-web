'use server';

import { db } from '@/server/db';
import { Failure, Result, Success } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { and, eq } from 'drizzle-orm';
import { follows, profiles, users } from 'drizzle/schema';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FollowButton } from './FollowButton';

type Props = {
  userName: string;
};

type TProfile = {
  displayName: string;
  overview: string;
  avatarUrl: string;
};

export const Profile = async (props: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profileResult = await getProfileByUserName(props.userName);

  if (profileResult.isFailure()) {
    return <div>プロフィールがありません</div>;
  }

  const isFollowing = await getIsFollowing({
    loggedUserId: user?.id as string,
    targetUserName: props.userName,
  });

  const loggedUserName = await getUserNameByUserId(user?.id as string);

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-between mb-5">
        <Image
          className="rounded-full w-20 h-20 object-cover block"
          src={profileResult.value.avatarUrl}
          alt="icon"
          width={100}
          height={100}
          priority={true}
        />
        <div className="flex items-center">
          {/* 自分のProfileならFollowButtonを表示しない */}
          {loggedUserName !== props.userName ? (
            <FollowButton userName={props.userName} isFollowing={isFollowing} />
          ) : (
            ''
          )}
        </div>
      </div>
      <p className="text-xl font-bold text-[#646767] mb-5">
        {profileResult.value.displayName}
      </p>
      <p className="text-xs text-[#646767] mb-7">
        {profileResult.value.overview}
      </p>

      {/* 自分のProfileなら編集ボタンを表示する */}
      {loggedUserName === props.userName ? (
        <Link className="border text-blue-500" href={`/${props.userName}/edit`}>
          編集
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};

const getProfileByUserName = async (
  userName: string,
): Promise<Result<TProfile, Error>> => {
  try {
    const result = await db
      .select({
        displayName: profiles.displayName,
        overview: profiles.overview,
        avatarUrl: profiles.avatarUrl,
      })
      .from(users)
      .innerJoin(profiles, eq(users.id, profiles.id))
      .where(eq(users.userName, userName))
      .limit(1);

    return new Success({
      displayName: result[0].displayName,
      overview: result[0].overview,
      avatarUrl: result[0].avatarUrl,
    });
  } catch (error) {
    console.log(error);
    return new Failure(error as Error);
  }
};

const getIsFollowing = async ({
  loggedUserId,
  targetUserName,
}: {
  loggedUserId: string;
  targetUserName: string;
}): Promise<boolean> => {
  try {
    const targetUserId = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.userName, targetUserName));
    const result = await db
      .select({ id: follows.id })
      .from(follows)
      .where(
        and(
          eq(follows.userId, loggedUserId),
          eq(follows.followingUserId, targetUserId[0].id),
        ),
      );

    console.log('result: ', result);
    return result.length > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// userIdを元にuserNameを取得する
const getUserNameByUserId = async (userId: string): Promise<string> => {
  try {
    const result = await db
      .select({ userName: users.userName })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    return result[0].userName;
  } catch (error) {
    console.log(error);
    return '';
  }
};
