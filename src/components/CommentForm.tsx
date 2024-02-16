'use client';

import { SubmitButton } from '@/components/SubmitButton';
import { formActionResult } from '@/types/types';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { CommentSubmitButton } from './CommentSubmitButton';

type Props = {
  formAction: (
    prevState: formActionResult,
    formData: FormData,
  ) => Promise<formActionResult>;
};

const initialState: formActionResult = {
  success: false,
  message: '',
};

export const CommentForm = (props: Props) => {
  const [state, formAction] = useFormState(props.formAction, initialState);

  const ref = useRef<HTMLFormElement>(null);

  return (
    <div>
      <form
        ref={ref}
        action={(formData) => {
          formAction(formData);
          ref.current?.reset();
        }}
      >
        <input className="w-56 h-12 border-none px-2 focus:outline-none text-[#646767]" placeholder='コメントを書き込む' type="text" name="comment" required />
        <CommentSubmitButton />
      </form>

      {/* {state.success ? (
        <div className="text-green-500">{state.message}</div>
      ) : (
        <div className="text-red-500">{state.message}</div>
      )} */}
    </div>
  );
};
