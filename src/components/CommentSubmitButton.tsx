'use client';
import { useFormStatus } from 'react-dom';

export const CommentSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#646767] w-16 h-9 rounded-md text-[#DDBFAE]"
    >
      {pending ? 'sending' : 'send'}
    </button>
  );
};
