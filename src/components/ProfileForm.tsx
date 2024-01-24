'use client';

import { profileFormAction } from '@/actions/profileFormAction';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
};

export default function ProfileForm() {
  const [state, formAction] = useFormState(profileFormAction, initialState);

  return (
    <div>
      <form action={formAction}>
        <label htmlFor="displayName">
          表示名
          <input
            className="border"
            type="text"
            id="displayName"
            name="displayName"
            required
          />
        </label>
        <label htmlFor="overview">
          概要
          <input className="border" type="text" id="overview" name="overview" />
        </label>
        <label htmlFor="avatar">
          <input type="file" id="avatar" name="avatar" />
        </label>
        <button type="submit">submit</button>
      </form>
      <p>{state?.message}</p>
    </div>
  );
}
