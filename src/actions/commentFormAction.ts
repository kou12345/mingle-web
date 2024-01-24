'use server';

import { createCommentRepository } from '@/server/repository/comment';
import { createCommentService } from '@/server/service/comment';
import { State } from '@/types/types';
import { revalidatePath } from 'next/cache';

export async function commentFormAction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postId: string,
  userId: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const comment = formData.get('comment') as string;
  console.log(comment);
  console.log(postId);
  console.log(userId);

  // commentを投稿する

  const commentService = createCommentService(createCommentRepository());

  const result = await commentService.createComment({
    postId,
    userId,
    comment,
  });
  if (result.isFailure()) {
    console.log('createCommentが失敗した!!!!');
    console.log(result.value);
  }

  revalidatePath('/');

  return {
    message: 'コメントを投稿しました',
  };
}
