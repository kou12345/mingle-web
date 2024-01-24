/* eslint-disable @typescript-eslint/no-misused-promises */
'use server';

import { updatePostFormAction } from '@/actions/updatePostFormAction';
import { AvatarFileInput } from '@/components/AvatarFileInput';
import { DisplayNameInput } from '@/components/DisplayNameInput';
import { OverviewInput } from '@/components/OverviewInput';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { profiles, users } from 'drizzle/schema';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { userName: string };
}) {
  const { userName } = params;

  // TODO 自分のプロフィールを取得
  const profile = await getProfileByUserName(userName);
  if (profile === null) {
    // TODO エラーページとかに飛ばす
    return <div>プロフィールがありません</div>;
  }

  const updatePostFormActionWithUserName = updatePostFormAction.bind(
    null,
    userName,
  );

  return (
    <div>
      <div>プロフィール編集</div>

      <form action={updatePostFormActionWithUserName}>
        <DisplayNameInput userName={profile.displayName} />
        <OverviewInput overview={profile.overview} />
        <AvatarFileInput avatarUrl={profile.avatarUrl} />

        <button type="submit">更新</button>
      </form>
      <Link href={`/${userName}`}>戻る</Link>
    </div>
  );
}

// [userName]のprofileを取得
// todo 返り値の型を定義する
const getProfileByUserName = async (userName: string) => {
  try {
    const result = await db
      .select({
        displayName: profiles.displayName,
        overview: profiles.overview,
        avatarUrl: profiles.avatarUrl,
      })
      .from(users)
      .leftJoin(profiles, eq(users.id, profiles.id))
      .where(eq(users.userName, userName))
      .limit(1);

    if (result.length === 0) {
      throw new Error(`Profile not found for userName: ${userName}`);
    }

    return {
      displayName: result[0].displayName as string,
      overview: result[0].overview as string,
      avatarUrl: result[0].avatarUrl as string,
    };
  } catch (error) {
    console.log(error);
    // todo エラー処理
    return null;
  }
};
