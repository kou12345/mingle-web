'use client';
import { useFormStatus } from 'react-dom';

type Props = {
  isValidationCheck: boolean
}

export const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus();

  const check = () => {
    if(pending || !props.isValidationCheck) {
      return true
    }else {
      return false
    }
  }
  const isCheck = check()

  return (
    <button
      type="submit"
      disabled={isCheck}
      className="h-12 w-full rounded-3xl bg-[#B3D0CF] text-white disabled:opacity-40"
    >
      {pending ? '投稿中' : '投稿する'}
    </button>
  );
};
