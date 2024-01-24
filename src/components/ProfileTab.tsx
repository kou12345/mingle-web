import Link from 'next/link';

type Props = {
  userName: string;
};

export const ProfileTab = (props: Props) => {
  return (
    <div className="flex justify-center space-x-20 mb-7">
      <Link
        href={`/${props.userName}`}
        className="text-[#646767] text-xl font-bold"
      >
        Posts
      </Link>
      <Link
        href={`/${props.userName}/likes`}
        className="text-[#646767] text-xl font-bold"
      >
        Likes
      </Link>
    </div>
  );
};
