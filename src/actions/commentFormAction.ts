'use server';

import { createComment } from '@/server/comment';
import { formActionResult } from '@/types/types';
import { revalidatePath } from 'next/cache';

export async function commentFormAction(
  postId: string,
  userId: string,
  _prevState: formActionResult,
  formData: FormData,
): Promise<formActionResult> {
  console.log('commentFormActionが実行された時間: ', new Date());

  const comment = formData.get('comment') as string;

  // validation
  if (!comment) {
    return {
      success: false,
      message: 'コメントが空です',
    };
  }

  try {
    // コメントを作成
    await createComment({
      postId,
      userId,
      comment,
    });

    revalidatePath('/posts/[id]', 'page');

    return {
      success: true,
      message: 'コメントを投稿しました',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'コメントを投稿できませんでした',
    };
  }
}
