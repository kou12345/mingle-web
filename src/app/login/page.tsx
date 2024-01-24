'use server';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function Login() {
  return (
    <div className="bg-[#E3DEDA] w-11/12 h-[405px] mt-40 rounded-xl mx-auto relative ">
      <form
        method="post"
        action="api/auth/login"
        className="flex flex-col w-full items-center absolute bottom-0 "
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-5/6 h-9 border border-[#6E96A5] rounded-md bg-transparent mb-5 mt-5"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-5/6 h-9 border border-[#6E96A5] rounded-md bg-transparent mb-5"
          required
        />
        <button
          type="submit"
          className="w-48 h-14 bg-[#B3D0CF] rounded-2xl text-white mb-5"
        >
          Login
        </button>
      </form>
    </div>
  );
}
