'use server';

import { db } from '@/server/db';
import { desc, eq } from 'drizzle-orm';
import { comments, profiles, users } from 'drizzle/schema';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  postId: string;
};

export const CommentList = async (props: Props) => {
  console.log('CommentList START');

  const comments = await getCommentsByPostId(props.postId);
  if (!comments) {
    return <div>コメントがありません</div>;
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index} className="flex my-5">
          <Image
            className="block w-11 h-11 rounded-full mr-2"
            src={comment.avatarUrl}
            alt="icon"
            width={100}
            height={100}
            priority={true}
          />
          {/* <div>
            <Link href={`/${comment.userName}`} className="font-bold">
              {comment.displayName}
            </Link>
            <div className="border">{comment.comment}</div>
          </div> */}

          <div className="w-full">
            <Link
              href={`/${comment.userName}`}
              className="mb-1 text-[#646767] font-bold"
            >
              {comment.displayName}
            </Link>
            <div className="border border-[#6E96A5] w-full min-h-14 rounded-md">
              <p className="w-11/12 mx-auto text-[#646767] text-xs my-3">
                {comment.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getCommentsByPostId = async (postId: string) => {
  try {
    const result = await db
      .select({
        comment: comments.comment,
        displayName: profiles.displayName,
        avatarUrl: profiles.avatarUrl,
        userName: users.userName,
      })
      .from(comments)
      .where(eq(comments.postId, postId))
      .innerJoin(users, eq(comments.userId, users.id))
      .innerJoin(profiles, eq(users.id, profiles.id))
      .orderBy(desc(comments.createdAt));

    return result;
  } catch (error) {
    console.log('ERROR !!!!!!!!!!!');
    console.log(error);
  }
};
