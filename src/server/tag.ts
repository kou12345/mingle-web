import 'server-only';
import { Tag, Transaction } from '@/types/types';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { tags } from 'drizzle/schema';

// すでにタグが存在すれば、そのタグを返す。なければ作成してから返す
// TODO もっと良い名前がありそう
// TODO Bulk insertを使った方がいいかも
export const createOrGetTags = async ({
  tx,
  tagNames,
}: {
  tx?: Transaction;
  tagNames: string[];
}): Promise<Tag[]> => {
  // returnするタグのリスト
  const tagList: Tag[] = [];
  try {
    for (const tagName of tagNames) {
      // タグが存在するか確認する
      const existingTags = await (tx || db)
        .select({
          id: tags.id,
          name: tags.name,
        })
        .from(tags)
        .where(eq(tags.name, tagName));
      // タグが存在する場合はそのタグをtagListに追加する
      if (existingTags.length > 0) {
        tagList.push(existingTags[0]);
      } else {
        // タグが存在しない場合は作成する
        const result = await (tx || db)
          .insert(tags)
          .values({
            name: tagName,
          })
          .returning({ id: tags.id, name: tags.name });

        tagList.push({
          id: result[0].id,
          name: result[0].name,
        });
      }
    }
    return tagList;
  } catch (error) {
    console.error(error);

    throw new Error('createOrGetTags failed');
  }
};
