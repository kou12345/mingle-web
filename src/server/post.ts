import { PostDetail } from '@/types/types';
import { eq } from 'drizzle-orm';
import { postTagRelation, posts, users } from 'drizzle/schema';
import 'server-only';
import { db } from './db';
import { uploadMusicFile } from './musicFile';
import { createOrGetTags } from './tag';
import { getUserNameByUserId } from './user';

// userNameを元に投稿一覧を取得する
export const getPostsByUserName = async (
  userName: string,
): Promise<PostDetail[]> => {
  let posts: PostDetail[] = [];
  // todo 一旦limitを10にしているが、後に無限スクロールにする
  try {
    const result = await db.query.users.findMany({
      with: {
        posts: {
          with: {
            postTagRelations: {
              with: {
                tag: true,
              },
            },
          },
          // 投稿を作成日時の昇順で取得（新しい投稿を先頭に）
          orderBy: (posts, { asc }) => [asc(posts.createdAt)],
          limit: 10,
        },
        profile: true,
      },
      where: eq(users.userName, userName),
    });

    // 取得したデータを整形
    posts = result.flatMap((user) =>
      user.posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        musicFileUrl: post.musicFileUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        tags: post.postTagRelations.map((relation) => relation.tag.name),
        author: {
          userName: user.userName,
          displayName: user.profile.displayName,
          avatarUrl: user.profile.avatarUrl,
        },
      })),
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error('投稿一覧を取得できませんでした。');
    }
  }

  return posts;
};

// postIdを元に投稿を取得する
export const getPostById = async (postId: string): Promise<PostDetail> => {
  let post: PostDetail = {
    id: '',
    title: '',
    content: '',
    musicFileUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    author: {
      userName: '',
      displayName: '',
      avatarUrl: '',
    },
  };

  try {
    const result = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      columns: {
        id: true,
        title: true,
        musicFileUrl: true,
        content: true,
        createdAt: true,
        updatedAt: true,
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

    if (!result) {
      throw new Error('投稿が見つかりませんでした。');
    }

    post = {
      id: result.id,
      title: result.title,
      content: result.content,
      musicFileUrl: result.musicFileUrl,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      tags: result.postTagRelations.map((postTagRelation) => {
        return postTagRelation.tag.name;
      }),
      author: {
        userName: result.user.userName,
        displayName: result.user.profile.displayName,
        avatarUrl: result.user.profile.avatarUrl,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error('投稿を取得できませんでした。');
    }
  }

  return post;
};

// 投稿を作成する
export const createPost = async ({
  userId,
  title,
  content,
  musicFile,
  tagNames,
}: {
  userId: string;
  title: string;
  content: string;
  musicFile: File;
  tagNames: string[];
}): Promise<string> => {
  try {
    // トランザクション開始
    return await db.transaction(async (tx) => {
      // userIdを元にユーザーを取得
      const userName = await getUserNameByUserId({ tx, userId });
      if (!userName) {
        throw new Error('ERROR: ユーザーが見つかりませんでした。');
      }

      // タグの作成, または既存のタグの取得
      const tags = await createOrGetTags({
        tx,
        tagNames,
      });

      // 音声ファイルのアップロード
      const musicFileUrl = await uploadMusicFile({
        musicFile,
        title,
        userName,
      });

      // 投稿の作成
      const post = await tx
        .insert(posts)
        .values({
          userId,
          title,
          content,
          musicFileUrl,
        })
        .returning({ id: posts.id });

      // 投稿とタグの紐付け;
      await tx.insert(postTagRelation).values(
        tags.map((tag) => ({
          postId: post[0].id,
          tagId: tag.id,
        })),
      );

      return post[0].id;
    });
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: 投稿を作成できませんでした。');
  }
};
