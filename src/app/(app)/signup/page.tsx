import Link from 'next/link';

export default function Signup() {
  return (
    <div className="relative mx-auto mt-40 h-[405px] w-11/12 rounded-xl bg-[#E3DEDA]">
      <form
        action="/api/auth/signup"
        method="post"
        className="absolute bottom-0 flex w-full flex-col items-center "
      >
        <label htmlFor="email" className="flex h-full w-full justify-center">
          <input
            name="email"
            placeholder='Email'
            required
            className="mb-5 mt-5 h-9 w-5/6 rounded-md border border-[#6E96A5] bg-transparent focus:outline-none px-2 text-[#646767]"
          />
        </label>
        <label htmlFor="password" className="flex h-full w-full justify-center">
          <input
            type="password"
            placeholder='Password'
            name="password"
            required
            className="mb-5 h-9 w-5/6 rounded-md border border-[#6E96A5] bg-transparent focus:outline-none px-2 text-[#646767]"
          />
        </label>
        <button
          type="submit"
          className="h-14 w-48 rounded-2xl bg-[#B3D0CF] text-white"
        >
          Sign Up
        </button>
        <Link href="/login" className="mb-5 text-[#646767]">
          or <span className="text-[#6E96A5]">login</span>
        </Link>
      </form>
    </div>
  );
}
