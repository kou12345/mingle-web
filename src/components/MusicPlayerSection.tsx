'use server';

import { Tag } from '@/components/ui/Tag';
import { db } from '@/server/db';
import { createClient } from '@/utils/supabase/server';
import { Like } from '@public/like';
import { and, eq } from 'drizzle-orm';
import { likes, posts } from 'drizzle/schema';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
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
    // TODO ここにORMを書かない
    // 良いねをしているかどうかを確認する
    const like = await db
      .select({ id: likes.id })
      .from(likes)
      .where(and(eq(likes.postId, props.postId), eq(likes.userId, user.id)));
    isLiked = like.length > 0;
    console.log('isLiked: ', isLiked);
  }

  // 投稿データを取得する
  const post = await getPostData(props.postId);
  if (!post) {
    return <div>投稿がありません</div>;
  }

  return (
    <div className="w-full rounded-xl bg-[#E3DEDA] mb-7">
      <div className="flex flex-col items-center">
        <div className="relative h-10 w-fit flex flex-col items-center mt-8">
          <p className="text-2xl font-bold text-[#646767] z-20 relative">
            {post.title}
          </p>
          <label className="w-full h-7 bg-[#B3D0CF] block absolute top-3 rounded-xl"></label>
        </div>
        <MusicPlayButton />
        <div className="w-3/4">
          <MusicSlider />
        </div>
        <div className="w-5/6">
          <div className="flex w-full justify-between mb-3">
            {/* todo */}
            {post.tags?.map((tag, index) => {
              return <Tag key={index} text={tag} />;
            })}
            {/* tagsの要素がない場合、<Like/>の位置がズレる */}
            <button className="">
              <Like />
            </button>
          </div>
          <p className="text-xs text-[#646767] mb-6">{post.content}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Image
                src={post.avatarUrl as string}
                alt="Picture of the author"
                width={500}
                height={500}
                priority={true}
                className="block w-11 h-11 rounded-full"
              />

              <p className="text-[#646767] font-bold ml-3">
                {post.user.displayName}
              </p>
              {/* TODO cssが適応されていない */}
              <Link href={`/${post.user.userName}`}>
                <p className='className="text-[#646767] ml-3'>
                  {post.user.displayName}
                </p>
              </Link>
            </div>
            {/* todo */}
            <button className="w-16 h-8 bg-[#646767] text-[#DDBFAE] rounded-md">
              follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getPostData = async (postId: string) => {
  try {
    const result = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      columns: {
        id: true,
        title: true,
        musicFileUrl: true,
        content: true,
      },
      with: {
        postTagRelations: {
          columns: {},
          with: {
            tag: {
              columns: {
                name: true,
              },
            },
          },
        },
        user: {
          columns: {
            userName: true,
          },
          with: {
            profile: {
              columns: {
                displayName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    // データ整形
    const post = {
      id: result?.id,
      title: result?.title,
      musicFileUrl: result?.musicFileUrl,
      tags: result?.postTagRelations.map((postTagRelation) => {
        return postTagRelation.tag.name;
      }),
      content: result?.content,
      avatarUrl: result?.user.profile.avatarUrl,
      user: {
        userName: result?.user.userName,
        displayName: result?.user.profile.displayName,
      },
    };

    return post;
  } catch (error) {
    console.log('投稿データの取得に失敗しました');
    console.log(error);
  }
};
