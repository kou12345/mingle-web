import { logoutAction } from '@/actions/logout';

export const LogoutButton = () => {
  return (
    <button
      className="absolute bottom-0 flex h-14 w-full items-center"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => logoutAction()}
    >
      <p className="ml-10 inline-block text-base text-[#646767]">Logout</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="humbleicons hi-logout ml-6 inline-block w-8 text-[#B3D0CF]"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 12h-9.5m7.5 3l3-3-3-3m-5-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h5a2 2 0 002-2v-1"
        />
      </svg>
    </button>
  );
};
