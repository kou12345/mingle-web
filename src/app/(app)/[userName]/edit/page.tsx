/* eslint-disable @typescript-eslint/no-misused-promises */

import { updateProfileFormAction } from '@/actions/updateProfileFormAction';
import { ProfileForm } from '@/components/ProfileForm';
import { getProfileByUserName } from '@/server/profile';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { userName: string };
}) {
  const { userName } = params;

  // 自分のプロフィールを取得
  const profile = await getProfileByUserName(userName);
  // TODO エラーを投げられたらエラーページに飛ばす

  const updateProfileFormActionWithUserName = updateProfileFormAction.bind(
    null,
    userName,
  );

  return (
    <div>
      <div>プロフィール編集</div>
      <ProfileForm
        formAction={updateProfileFormActionWithUserName}
        actionType="update"
        existingData={{
          displayName: profile.displayName,
          overview: profile.overview,
          avatarUrl: profile.avatarUrl,
        }}
      />

      <Link href={`/${userName}`}>戻る</Link>
    </div>
  );
}
