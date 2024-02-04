import { Tag } from '@/components/ui/Tag';
import { checkPostLikedByUser } from '@/server/like';
import { getPostById } from '@/server/post';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { LikeButton } from './LikeButton';
import { MusicPlayButton } from './MusicPlayButton';
import { MusicSlider } from './MusicSlider';

type Props = {
  postId: string;
};

export const MusicPlayerSection = async (props: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // ログイン中のユーザー情報を取得する
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ログインしている場合は、良いねをしているか確認する
  let isLiked = false;
  if (user) {
    // すでにいいねしているか確認する
    isLiked = await checkPostLikedByUser({
      postId: props.postId,
      userId: user.id,
    });
    console.log('isLiked: ', isLiked);
    console.log(new Date());
  }

  // 投稿データを取得する
  const post = await getPostById(props.postId);
  // TODO エラー処理

  return (
    <div className="mb-7 w-full rounded-xl bg-[#E3DEDA]">
      <div className="flex flex-col items-center">
        <div className="relative mt-8 flex h-10 w-fit flex-col items-center">
          <p className="relative z-20 text-2xl font-bold text-[#646767]">
            {post.title}
          </p>
          <label className="absolute top-3 block h-7 w-full rounded-xl bg-[#B3D0CF]"></label>
        </div>
        <MusicPlayButton />
        <div className="w-3/4">
          <MusicSlider />
        </div>
        <div className="w-5/6">
          <div className="mb-3 flex w-full justify-between">
            {/* todo */}
            {post.tags?.map((tag, index) => {
              return <Tag key={index} text={tag} />;
            })}
            {/* tagsの要素がない場合、<Like/>の位置がズレる */}
            {/* <button className=""> */}
            {/* <Like /> */}
            {/* </button> */}
            <LikeButton postId={props.postId} isLiked={isLiked} />
          </div>
          <p className="mb-6 text-xs text-[#646767]">{post.content}</p>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={post.author.avatarUrl}
                alt="Picture of the author"
                width={500}
                height={500}
                priority={true}
                className="block h-11 w-11 rounded-full"
              />

              <p className="ml-3 font-bold text-[#646767]">
                {post.author.displayName}
              </p>
              {/* TODO cssが適応されていない */}
              <Link href={`/${post.author.userName}`}>
                <p className='className="text-[#646767] ml-3'>
                  {post.author.displayName}
                </p>
              </Link>
            </div>
            {/* todo */}
            <button className="h-8 w-16 rounded-md bg-[#646767] text-[#DDBFAE]">
              follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
