export default function Login() {
  return (
    <div className="relative mx-auto mt-40 h-[405px] w-11/12 rounded-xl bg-[#E3DEDA] ">
      <form
        method="post"
        action="api/auth/login"
        className="absolute bottom-0 flex w-full flex-col items-center "
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="mb-5 mt-5 h-9 w-5/6 rounded-md border border-[#6E96A5] bg-transparent"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-5 h-9 w-5/6 rounded-md border border-[#6E96A5] bg-transparent"
          required
        />
        <button
          type="submit"
          className="mb-5 h-14 w-48 rounded-2xl bg-[#B3D0CF] text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
