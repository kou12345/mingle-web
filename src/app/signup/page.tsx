'use server';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function Signup() {
  return (
    <div className="bg-[#E3DEDA] w-11/12 h-[405px] mt-40 rounded-xl mx-auto relative">
      <form
        action="/api/auth/signup"
        method="post"
        className="flex flex-col w-full items-center absolute bottom-0 "
      >
        <label htmlFor="email" className="w-full h-full flex justify-center">
          <input
            name="email"
            required
            className="w-5/6 h-9 border border-[#6E96A5] rounded-md bg-transparent mb-5 mt-5"
          />
        </label>
        <label htmlFor="password" className="w-full h-full flex justify-center">
          <input
            type="password"
            name="password"
            required
            className="w-5/6 h-9 border border-[#6E96A5] rounded-md bg-transparent mb-5"
          />
        </label>
        <button
          type="submit"
          className="w-48 h-14 bg-[#B3D0CF] rounded-2xl text-white mb-5"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
