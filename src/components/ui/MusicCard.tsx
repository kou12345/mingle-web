'use server';

import { PostDetail } from '@/types/types';

import Image from 'next/image';
import Link from 'next/link';
import { Tag } from './Tag';

type Props = {
  post: PostDetail;
};

export const MusicCard = (props: Props) => {
  const post = props.post;
  return (
    <div className="bg-[#E3DEDA] w-full h-44 rounded-xl pl-6 pt-5">
      <div className="flex">
        <div className="w-56">
          <div>
            <Link
              href={`/posts/${post.id}`}
              className="text-xl font-bold text-[#646767]"
            >
              {post.title}
            </Link>
          </div>
          <Link
            href={`/${post.author.userName}`}
            className="text-base font-bold text-[#646767] mb-3"
          >
            {post.author.displayName}
          </Link>
          <p className="text-xs text-[#646767]">{post.content}</p>
        </div>
        <div>
          <Image
            className="block w-20 h-20 rounded-full ml-4"
            src={post.author.avatarUrl}
            alt="Picture of the author"
            width={500}
            height={500}
            priority={true}
          />
        </div>
      </div>
      <div className="mt-2 space-x-3">
        {post.tags.map((tag, index) => (
          <div key={index}>
            <Tag text={`${tag}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
