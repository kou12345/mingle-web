'use server';

import { Likedlist } from '@/components/Likedlist';
import { getLikedPostsByUserName } from '@/server/post';
import { getUserIdByUserName } from '@/server/user';

// TODO
// eslint-disable-next-line @typescript-eslint/require-await
export default async function Page({
  params,
}: {
  params: { userName: string };
}) {
  const { userName } = params;
  console.log('userName: ', userName);
  const likes = await getLikedPostsByUserName(userName);

  // 自分がいいねした投稿を取得
  // const data = await getLikedPostsByUserName(userName);
  return <Likedlist likes={likes} />
}
