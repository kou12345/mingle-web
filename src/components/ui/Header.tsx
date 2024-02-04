'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoginButton } from '../LoginButton';
import { LogoutButton } from '../LogoutButton';

type Props = {
  userName?: string;
};

export const Header = (props: Props) => {
  const pathname = usePathname();

  const { userName } = props;

  const [isCheck, setIsCheck] = useState(false);
  const [menuBgStyle, setMenuBgStyle] = useState<string>('hidden z-0');
  const [menuStyle, setMenuStyle] = useState<string>('left-[-100%]');
  const [hamburgerStyle, setHamburgerStyle] = useState<string>('');
  const [closeStyle, setCloseStyle] = useState<string>('hidden');

  useEffect(() => {
    if (isCheck === true) {
      setMenuStyle('left-0');
      setMenuBgStyle('fixed z-20');
      setHamburgerStyle('hidden');
      setCloseStyle('');
    } else {
      setMenuStyle('left-[-100%]');
      setMenuBgStyle('hidden z-0');
      setHamburgerStyle('');
      setCloseStyle('hidden');
    }
  }, [isCheck]);

  useEffect(() => {
    const url = `${pathname}`;
    console.log(url);
    setIsCheck(false);
  }, [pathname]);

  return (
    <>
      <label
        htmlFor="menu"
        className={`h-[100vh] w-full bg-[#0000002d] ${menuBgStyle}`}
      ></label>
      <nav
        className={`fixed h-[100vh] w-2/3 bg-[#E3DEDA] ${menuStyle}  fixed z-50 transition-all`}
        id="menu-nav"
      >
        <div className="flex h-12 w-full items-center">
          <label
            htmlFor="menu"
            className=" z-20 ml-4 block h-7 w-7 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className={`${closeStyle} humbleicons hi-bars text-[#646767]`}
            >
              <g
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M18 18L6 6" />
              </g>
            </svg>
          </label>
        </div>
        <ul className={`${menuStyle} ml-8 mt-28 space-y-4`}>
          <li>
            <Link href="/" className="text-[#646767]">
              Home
            </Link>
          </li>
          <li>
            {userName ? (
              <Link href={`/${userName}`} className="text-[#646767]">
                Profile
              </Link>
            ) : (
              <div></div>
            )}
          </li>
          <li>
            {userName ? (
              <Link href={`/${userName}/likes`} className="text-[#646767]">
                Likes
              </Link>
            ) : (
              <div></div>
            )}
          </li>
          <li>
            {userName ? (
              <Link href="#" className="text-[#646767]">
                Follows
              </Link>
            ) : (
              <div></div>
            )}
          </li>
          <li>
            {userName ? (
              <Link href="/post" className="text-[#646767]">
                Post
              </Link>
            ) : (
              <div></div>
            )}
          </li>
        </ul>
        {userName ? <LogoutButton /> : <LoginButton />}
      </nav>
      <header className="fixed top-0 z-40 flex h-12 w-full items-center bg-[#B3D0CF]">
        <input
          type="checkbox"
          id="menu"
          className="hidden"
          onChange={() => setIsCheck(!isCheck)}
        />
        <label htmlFor="menu" className=" z-20 ml-4 block h-7 w-7 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className={`${hamburgerStyle} humbleicons hi-bars text-[#646767]`}
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </header>
    </>
  );
};
