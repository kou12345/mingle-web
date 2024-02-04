import { CreatePostForm } from '@/components/CreatePostForm';
import { db } from '@/server/db';
import { tags } from 'drizzle/schema';

export default function Page() {
  // ! とりあえずタグの入力は一つのみ受け付ける

  // const { tags, error } = await getTags();
  // const tagError = error;

  return (
    <div>
      {/* <div>タグ</div>
      <div>
        {tagError ? (
          <div>{tagError}</div>
        ) : (
          tags.map((tag) => (
            <div key={tag.id}>
              <div>{tag.name}</div>
            </div>
          ))
        )}
      </div>
      <div>新規投稿</div> */}

      <CreatePostForm />
    </div>
  );
}

type Tag = {
  id: string;
  name: string;
};

// tagを取得する
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTags = async (): Promise<{ tags: Tag[]; error: string }> => {
  try {
    const result = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(tags);
    return { tags: result, error: '' };
  } catch (error) {
    console.log(error);
    return { tags: [], error: 'タグの取得に失敗しました' };
  }
};
