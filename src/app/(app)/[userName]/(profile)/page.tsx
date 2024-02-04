import { Tag } from '@/components/ui/Tag';
import { getPostsByUserName } from '@/server/post';
import { PostDetail } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { userName: string };
}) {
  const { userName } = params;

  // 自分の投稿を取得
  const posts = await getPostsByUserName(userName);
  // TODO errorが投げられた時の処理

  if (posts.length === 0) {
    return <div>投稿がありません</div>;
  }

  return (
    <div className="mx-auto w-11/12">
      {posts.map((post: PostDetail, index) => (
        <div
          className="relative z-10 mb-5 block h-44 w-full rounded-xl bg-[#E3DEDA] pl-6 pt-5"
          key={index}
        >
          <Link
            href={`/posts/${post.id}`}
            className="absolute left-0 top-0 z-20 block h-full w-full rounded-xl bg-slate-800 opacity-0"
          />
          <div className="flex">
            <div className="w-56">
              <p className="text-xl font-bold text-[#646767]">{post.title}</p>
              <p className="mb-3 text-base font-bold text-[#646767]">
                {post.author.displayName}
              </p>
              <p className="text-xs text-[#646767]">{post.content}</p>
            </div>
            <div>
              <Link
                href={`/${post.author.userName}`}
                className="absolute z-30 ml-4 block h-20 w-20 rounded-full bg-red-400 opacity-0"
              />
              <Image
                src={post.author.avatarUrl}
                className="ml-4 block h-20 w-20 rounded-full"
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="absolute bottom-5 z-30 space-x-3">
            {post.tags.map((tag, index) => (
              <Tag text={`${tag}`} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
