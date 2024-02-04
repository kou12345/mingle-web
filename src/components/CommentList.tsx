import { getCommentsByPostId } from '@/server/comment';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  postId: string;
};

export const CommentList = async (props: Props) => {
  const comments = await getCommentsByPostId(props.postId);
  if (!comments) {
    return <div>コメントがありません</div>;
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index} className="my-5 flex">
          <Image
            className="mr-2 block h-11 w-11 rounded-full"
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
              className="mb-1 font-bold text-[#646767]"
            >
              {comment.displayName}
            </Link>
            <div className="min-h-14 w-full rounded-md border border-[#6E96A5]">
              <p className="mx-auto my-3 w-11/12 text-xs text-[#646767]">
                {comment.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
