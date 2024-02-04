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
            required
            className="mb-5 mt-5 h-9 w-5/6 rounded-md border border-[#6E96A5] bg-transparent"
          />
        </label>
        <label htmlFor="password" className="flex h-full w-full justify-center">
          <input
            type="password"
            name="password"
            required
            className="mb-5 h-9 w-5/6 rounded-md border border-[#6E96A5] bg-transparent"
          />
        </label>
        <button
          type="submit"
          className="mb-5 h-14 w-48 rounded-2xl bg-[#B3D0CF] text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
