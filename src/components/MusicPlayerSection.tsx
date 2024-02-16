import { Tag } from '@/components/ui/Tag';
import { checkPostLikedByUser } from '@/server/like';
import { getPostById } from '@/server/post';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { LikeButton } from './LikeButton';
import { PlayerPlaySlider } from './PlayerPlaySlider';
import { Session } from 'inspector';

type Data = {
  session: Session | null;
};

type Props = {
  postId: string;
  data?: Data;
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
        <div></div>
        <PlayerPlaySlider musicFileUrl={post.musicFileUrl} />
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
            <div className="ml-auto">
              <LikeButton
                postId={props.postId}
                isLiked={isLiked}
                data={props.data}
              />
            </div>
          </div>
          <p className="mb-6 text-xs text-[#646767]">{post.content}</p>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href={`/${post.author.userName}`}>
                <Image
                  src={post.author.avatarUrl as string}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  priority={true}
                  className="block h-11 w-11 rounded-full object-cover"
                />
              </Link>

              <p className="ml-3 font-bold text-[#646767]">
                {post.author.displayName}
              </p>
            </div>
            {/* todo */}
            {props.data?.session !== null &&
            props.data?.session !== undefined ? (
              <button className="h-9 w-20 rounded-md bg-[#646767] text-[#DDBFAE]">
                follow
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
