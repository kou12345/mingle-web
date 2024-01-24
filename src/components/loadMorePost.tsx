'use server';

import { db } from '@/server/db';
import { Failure, PostDetail, Result, Success } from '@/types/types';
import { MusicCard } from './ui/MusicCard';

const PAGE_SIZE = 10;

export const loadMorePost = async (offset: number = 0) => {
  const posts = await getPosts(offset);

  if (posts.isFailure()) {
    return [[], null] as const;
  }

  const nextOffset =
    posts.value.length >= PAGE_SIZE ? offset + PAGE_SIZE : null;

  // todo componentに分ける
  return [
    posts.value.map((post: PostDetail, index) => (
      <MusicCard post={post} key={index} />
    )),
    nextOffset,
  ] as const;
};

export const getPosts = async (
  offset: number,
): Promise<Result<PostDetail[], Error>> => {
  try {
    // ユーザーとその投稿、タグ、プロフィールを取得
    const result = await db.query.posts.findMany({
      columns: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        postTagRelations: {
          with: {
            tag: {
              columns: {
                id: true,
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
      // 投稿を作成日時の昇順で取得（新しい投稿を先頭に）
      orderBy: (posts, { asc }) => [asc(posts.createdAt)],
      limit: PAGE_SIZE,
      offset,
    });

    // 取得したデータを整形
    const data: PostDetail[] = result.map((post) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        tags: post.postTagRelations.map((relation) => relation.tag.name),
        author: {
          userName: post.user.userName,
          displayName: post.user.profile.displayName,
          avatarUrl: post.user.profile.avatarUrl,
        },
      };
    });

    return new Success(data);
  } catch (error) {
    return new Failure(error as Error);
  }
};
