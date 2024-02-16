'use client';

import { formActionResult } from '@/types/types';
import { useFormState } from 'react-dom';
import { AvatarFileInput } from './AvatarFileInput';
import { DisplayNameInput } from './DisplayNameInput';
import { OverviewInput } from './OverviewInput';

type BaseProps = {
  formAction: (
    _prevState: formActionResult,
    formData: FormData,
  ) => Promise<formActionResult>;
  // プロフィールの作成か更新かを表すプロパティ
  actionType: 'create' | 'update';
};

type UpdateProps = BaseProps & {
  actionType: 'update';
  existingData: {
    // 既存のデータを表すプロパティ
    displayName: string;
    overview: string;
    avatarUrl: string;
  };
};

type CreateProps = BaseProps & {
  actionType: 'create';
};

// Propsの型はactionTypeによって異なるプロパティを持つ
type Props = CreateProps | UpdateProps;

const initialState: formActionResult = {
  success: false,
  message: '',
};

export function ProfileForm(props: Props) {
  const [state, formAction] = useFormState(props.formAction, initialState);

  // `actionType` が `update` の場合、`existingData` を使用
  // `create` の場合は `undefined` または空文字列を渡す
  const displayNameDefaultValue =
    props.actionType === 'update' ? props.existingData.displayName : '';
  const overviewDefaultValue =
    props.actionType === 'update' ? props.existingData.overview : '';
  const avatarUrlDefaultValue =
    props.actionType === 'update' ? props.existingData.avatarUrl : '';

  return (
      <form action={formAction} className="w-full">
        <div className="mb-9 flex justify-between">
          <AvatarFileInput avatarUrl={avatarUrlDefaultValue} />
          <button
            type="submit"
            className="block h-8 w-16 items-center justify-center rounded-md bg-[#646767] text-[12px] font-bold text-[#DDBFAE] disabled:opacity-25"
          >
            Save
          </button>
        </div>
        <div className="mb-9">
          <DisplayNameInput displayName={displayNameDefaultValue} />
        </div>
        <div>
          <OverviewInput overview={overviewDefaultValue} />
        </div>
        {!state.success ? <p>{state.message}</p> : ""}
      </form>
  );
}
