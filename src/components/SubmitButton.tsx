'use client';
import { useFormStatus } from 'react-dom';

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#B3D0CF] w-full h-12 rounded-3xl text-white"
    >
      {pending ? '投稿中' : '投稿する'}
    </button>
  );
};
