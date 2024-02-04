'use server';
// TODO
// eslint-disable-next-line @typescript-eslint/require-await
export default async function Page({
  params,
}: {
  params: { userName: string };
}) {
  const { userName } = params;
  console.log('userName: ', userName);

  // 自分がいいねした投稿を取得
  // const data = await getLikedPostsByUserName(userName);
  return <div></div>;
}
