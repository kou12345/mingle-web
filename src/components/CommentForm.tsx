'use client';

import { SubmitButton } from '@/components/SubmitButton';
import { formActionResult } from '@/types/types';
import { useRef } from 'react';
import { useFormState } from 'react-dom';

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
        <input className="border" type="text" name="comment" required />
        <SubmitButton />
      </form>

      {state.success ? (
        <div className="text-green-500">{state.message}</div>
      ) : (
        <div className="text-red-500">{state.message}</div>
      )}
    </div>
  );
};
