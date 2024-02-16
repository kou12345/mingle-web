'use client';

import { followButtonAction } from '@/actions/followButton';
import { formActionResult } from '@/types/types';
import { useFormState } from 'react-dom';
import { FollowButton } from './FollowButton';

const initialState = {
  followed: false,
  error: false,
};

type Props = {
  displayName: string;
};

export const FollowButtonForm = (props: Props) => {
  const followButtonActionWithUserName = followButtonAction.bind(
    null,
    props.displayName,
  );
  const [state, formAction] = useFormState(
    followButtonActionWithUserName,
    initialState,
  );
  return (
    <form action={formAction}>
      <FollowButton userName={props.displayName} isFollowing={true} />
    </form>
  );
};
