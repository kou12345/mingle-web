'use server';

import { createMusicFileRepository } from '@/server/repository/musicFile';
import { createPostRepository } from '@/server/repository/post';
import { createPostTagRelationRepository } from '@/server/repository/postTagRelations';
import { createTagRepository } from '@/server/repository/tag';
import { createUserRepository } from '@/server/repository/user';
import { createPostService } from '@/server/service/post';
import { createTagService } from '@/server/service/tag';
import { State } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';

// TODO ログインしていない場合の処理

export async function createPostFormAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  // リダイレクト先のurl
  let redirectUrl = '';

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // これはいらないよね
    if (!user) {
      console.log('ログインしてください');
      throw new Error('ログインしてください');
    }

    // TODO validation

    const postService = createPostService(
      createPostRepository(),
      createUserRepository(),
      createMusicFileRepository(),
      createTagService(createTagRepository()),
      createPostTagRelationRepository(),
    );

    const postId = await postService.createPost({
      userId: user.id,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      musicFile: formData.get('musicFile') as File,
      tags: formData.getAll('tags') as string[],
    });

    console.log('postId: ', postId);

    if (postId.isFailure()) {
      throw new Error(postId.value.message);
    }

    redirectUrl = `/posts/${postId.value}`;
  } catch (error) {
    console.log(error);
    return { message: '投稿できませんでした ' };
  }

  revalidateTag('post');
  redirect(redirectUrl);
}
