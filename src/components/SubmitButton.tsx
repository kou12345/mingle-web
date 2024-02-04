'use client';
import { useFormStatus } from 'react-dom';

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-3xl bg-[#B3D0CF] text-white"
    >
      {pending ? '投稿中' : '投稿する'}
    </button>
  );
};
