import { logoutAction } from '@/actions/logout';

export const LogoutButton = () => {
  return (
    <button
      className="bottom-0 absolute h-14 w-full flex items-center"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => logoutAction()}
    >
      <p className="text-base inline-block ml-10 text-[#646767]">Logout</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="w-8 ml-6 text-[#B3D0CF] inline-block humbleicons hi-logout"
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
