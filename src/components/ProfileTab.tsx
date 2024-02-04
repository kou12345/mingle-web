import Link from 'next/link';

type Props = {
  userName: string;
};

export const ProfileTab = (props: Props) => {
  return (
    <div className="mb-7 flex justify-center space-x-20">
      <Link
        href={`/${props.userName}`}
        className="text-xl font-bold text-[#646767]"
      >
        Posts
      </Link>
      <Link
        href={`/${props.userName}/likes`}
        className="text-xl font-bold text-[#646767]"
      >
        Likes
      </Link>
    </div>
  );
};
